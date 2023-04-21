--[[ 
  luarocks install uuid
  luarocks install lua-json
]]

local uuid = require("uuid")
local socket = require("socket")
local json = require("json")
math.randomseed(socket.gettime()*1e9)

function request()
  wrk.method = "POST"
  wrk.headers["Content-Type"] = "application/json" 
  wrk.headers["Authorization"] = "Bearer <access-token>"
  wrk.body = json.encode({
    txId=uuid(),
    from="rhie-coder",
    inputs={
      account="wrk2-tester",
      amount="1",
    }
  })
  return wrk.format()
end

response = function(status, headers, body)
    if status ~= 200 then
        io.write("------------------------------\n")
        io.write("Response with status: ".. status .."\n")
        io.write("------------------------------\n")
        io.write("[response] Body:\n")
        io.write(body .. "\n")
    end
end 