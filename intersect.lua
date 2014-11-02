function Line:intersect(l)
    local a = (self.pos.x - self.vel.x * self.len) - self.pos.x
    local b = self.pos.x
    local c = (self.pos.y - self.vel.y * self.len) - self.pos.y
    local d = self.pos.y
    local e = (l.pos.x - l.vel.x * l.len) - l.pos.x
    local f = l.pos.x
    local g = (l.pos.y - l.vel.y * l.len) - l.pos.y
    local h = l.pos.y
    local t = ((h-d)*e - (f-b)*g)/(e*c - a*g)
    local s = ((h-d)*a - (f-b)*c)/(e*c - a*g)
    if t >= 0 and t <= 1 and s >= 0 and s <= 1 then
        if vec2((a*t + b) - self.pos.x, (c*t + d) - self.pos.y):len() < vec2((a*t + b) - l.pos.x, (c*t + d) - l.pos.y):len()
        and vec2(x,y) ~= self.brp and l.id ~= self.hid then
            self.hid = l.id
            return vec4((a*t + b), (c*t + d), l.vel.x, l.vel.y)
        else
            return false
        end
        return vec2(a*t + b, c*t + d)
    else
        return false
    end
end
