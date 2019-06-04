var fs = require('fs');

let dict = new Map();
let spawnedObjs = new Map();

mp.events.addCommand("msave", (player, text) => {
});

mp.events.addCommand("mclear", (player, text) => {
});

mp.events.addCommand("mload", (player, text) => {
});

mp.events.addCommand("mdeload", (player, text) => {
});

mp.events.addCommand("medit", (player, text) => {
});


mp.events.addCommand("mmaps", (player, text) => {
});

mp.events.addCommand("mobj", (player, text) => {
});

mp.events.addCommand("mindx", (player, text) => {
});

mp.events.addCommand("mcmds", (player, text) => {
});


function LoadMap(name)
{
    if(dict.has(name))
    {
        if(spawnedObjs.has(name))
        {
            for(var i = 0; i < spawnedObjs.get(name).length; i++)
            {
                spawnedObjs.get(name)[i].destroy();
            }
            spawnedObjs.delete(name);
        }

        let loadedObjs = [];
        let dictData = JSON.parse(dict.get(name));
        for(var i = 0; i < dictData.length; i++)
        {
            let obj = mp.objects.new(dictData[i].model, new mp.Vector3(dictData[i].x, dictData[i].y, dictData[i].z),
            {
                rotation: new mp.Vector3(dictData[i].rx, dictData[i].ry, dictData[i].rz),
                alpha: 255,
                dimension: -1
            });
            obj.setVariable("cmap_coll", dictData[i].col);
            if(dictData[i].freeze == null)
                obj.setVariable("cmap_freeze", true);
            else
                obj.setVariable("cmap_freeze", dictData[i].freeze);
            mp.players.call("MapEditor_SetColl", [obj.id, dictData[i].col]);
            if(dictData[i].freeze == null)
                mp.players.call("MapEditor_SetFreeze", [obj.id, true]);
            else
            mp.players.call("MapEditor_SetFreeze", [obj.id, dictData[i].freeze]);
            loadedObjs.push(obj);
        }
        spawnedObjs.set(name, loadedObjs);
    }
    else
    {
        if(spawnedObjs.has(name))
        {
            for(var i = 0; i < spawnedObjs.get(name).length; i++)
            {
                spawnedObjs.get(name)[i].destroy();
            }
            spawnedObjs.delete(name);
        }

        fs.readFile(name + "_map.json", {encoding: 'utf-8'}, function(err, data)
        {
            if(!err)
            {
                let loadedObjs = [];
                dict.set(name, data);
                let dictData = JSON.parse(data);
                for(var i = 0; i < dictData.length; i++)
                {
                    let obj = mp.objects.new(dictData[i].model, new mp.Vector3(dictData[i].x, dictData[i].y, dictData[i].z),
                    {
                        rotation: new mp.Vector3(dictData[i].rx, dictData[i].ry, dictData[i].rz),
                        alpha: 255,
                        dimension: -1
                    });
                    mp.players.call("MapEditor_SetColl", [obj.id, dictData[i].col]);
                    if(dictData[i].freeze == null)
                        mp.players.call("MapEditor_SetFreeze", [obj.id, true]);
                    else
                    mp.players.call("MapEditor_SetFreeze", [obj.id, dictData[i].freeze]);
                    loadedObjs.push(obj);
                }
                spawnedObjs.set(name, loadedObjs);
            }
            else
            {
                console.log(err);
            }
        });
    }
}

function DeloadMap(name)
{
    if(spawnedObjs.has(name))
    {
        for(var i = 0; i < spawnedObjs.get(name).length; i++)
        {
            spawnedObjs.get(name)[i].destroy();
        }
        spawnedObjs.delete(name);
    }
    else
    {
        
    }
}

function SaveMap(name, data)
{
    dict.set(name, data);
    fs.writeFile(name + "_map.json", data, (error) =>
    {
        return console.log(error);
    });
    //console.log("Saved!");
}

mp.events.add("MapEditor_Save", (player, name, data) =>
{
    SaveMap(name, data);
});

mp.events.add("MapEditor_Maps_Loaded", (player) =>
{
    let keys = [...spawnedObjs.keys()]
    if(keys.length > 0)
    {
        for(var i = 0; i < keys.length; i++)
        {
            player.outputChatBox("Map Loaded: " + keys[i]);
        }
    }
    else
    {
        player.outputChatBox("No maps loaded.");
    }
});

mp.events.add("MapEditor_Maps", (player) =>
{
    let keys = [...dict.keys()]
    if(keys.length > 0)
    {
        for(var i = 0; i < keys.length; i++)
        {
            player.outputChatBox("Map Saved: " + keys[i]);
        }
    }
    else
    {
        player.outputChatBox("No maps saved.");
    }
});


mp.events.add("MapEditor_Edit", (player, name) =>
{
    if(dict.has(name))
    {
        if(spawnedObjs.has(name))
        {
            for(var i = 0; i < spawnedObjs.get(name).length; i++)
            {
                spawnedObjs.get(name)[i].destroy();
            }
            spawnedObjs.delete(name);
        }
        player.call("MapEditor_EditMap", [dict.get(name)]);
    }
    else
    {
        if(spawnedObjs.has(name))
        {
            for(var i = 0; i < spawnedObjs.get(name).length; i++)
            {
                spawnedObjs.get(name)[i].destroy();
            }
            spawnedObjs.delete(name);
        }

        fs.readFile(name + "_map.json", {encoding: 'utf-8'}, function(err, data)
        {
            if(!err)
            {
                dict.set(name, data);
                player.call("MapEditor_EditMap", [data]);
            }
            else
            {
                console.log(err);
            }
        });
    }
});

mp.events.add("MapEditor_Deload", (player, name) =>
{
    DeloadMap(name);
});

mp.events.add("MapEditor_Load", (player, name) =>
{
    LoadMap(name);
});