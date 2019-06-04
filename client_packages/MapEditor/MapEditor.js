//0.1 version
//low version is a good excuse for buggy features
//math isnt complete so if u want state of the art look else where

//TODOS (temp)
//Add rotational mouse movement detection to rotation axis
//Add 2D graphic to rotation axis so they can be seen through the map/objects like the movement axis
//Add an object hash fetcher (Must work on any object, not just ragemp objects)

const Natives = require('./MapEditor/Natives.js')

//Bugged out as of 0.3.5
mp.events.add("entityStreamIn", (entity) => 
{
    if(entity.type === "object")
    {
        let collision = entity.getVariable("cmap_coll");
        if(collision != null)
        {
            entity.setCollision(collision, false);
        }

        let freeze = entity.getVariable("cmap_freeze");
        if(freeze != null)
        {
            entity.freezePosition(freeze);
        }
    }
});

//Called back from the server with data when player calls /medit
mp.events.add("MapEditor_EditMap", (data) =>
{
    let objs = JSON.parse(data);
    for(var i = 0; i < editorObjects.length; i++)
    {
        if(editorObjects[i] != null)
        {
            if(mp.objects.exists(editorObjects[i]))
            {
                editorObjects[i].destroy();
            }
        }
    }

    editorObjects = [];
    undoEditorObjects = [];

    editorState = 0;
    DestroyFocusObject();
    DestroyAxisMarkerObjs();
    DestroyMovMarkerObjs();

    for(var i = 0; i < objs.length; i++)
    {
        let obj = mp.objects.new(objs[i].model, new mp.Vector3(objs[i].x, objs[i].y, objs[i].z), new mp.Vector3(), 255, 0);
        obj.setLodDist(LODDist);
        obj.freezePosition(true);
        obj.setCollision(true, false);
        obj.setRotation(objs[i].rx, objs[i].ry, objs[i].rz, 2, true);
        obj.cmapcoll = objs[i].col;
        obj.cmapfreeze = objs[i].freeze;
        if(obj.cmapfreeze == null)
            obj.cmapfreeze = true;
        editorObjects.push(obj);
    }
});

//Called back to players when someone uses /mload
mp.events.add("MapEditor_SetColl", (entityID, coll) =>
{
    let entity = mp.objects.at(entityID);
    if(entity != null)
    {
        entity.setCollision(!!coll, false);
        entity.cmapcoll = !!coll;
        entity.setLodDist(LODDist);
    }
});

mp.events.add("MapEditor_SetFreeze", (entityID, frz) =>
{
    let entity = mp.objects.at(entityID);
    if(entity != null)
    {
        entity.freezePosition(!!frz);
        entity.cmapfreeze = !!frz;
        entity.setLodDist(LODDist);
    }
});

// Global variables
let objData = JSON.parse(require('./MapEditor/object_data.js')).Objects;

let editorStart = false;
let editorState = 0; //0 = select mode, 1 = placement mode, 2 = adjustement mode

let editorCamera = null;
let editorFocusObject = null;
let isFocusObjectAlreadyCreated = false;
let editorTransparencySelect = 200;

let editorObjects = [];
let undoEditorObjects = [];
let redoEditorObjects = []; //not used yet

/**
 * Binded keys for controlling editor
 * Reference: https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731
 */
const bindKeys = {
    KEY_ENTER: 0x0D,
    KEY_F2: 0x71,
    KEY_1: 0x31,
    KEY_2: 0x32,
    KEY_3: 0x33,
    KEY_SAVE: 0x73,
    KEY_UP: 0x26,
    KEY_DOWN: 0x28,
    KEY_LEFT: 0x25,
    KEY_RIGHT: 0x27,
    KEY_SPACE: 0x20,
    KEY_PLUS: 0xBB,
    KEY_MINUS: 0xBD,
    KEY_DELETE: 0x2E,
    KEY_C: 0x43,
    KEY_UNDO: 0x5A,
    KEY_REDO: 0x59,
    KEY_F: 0x46,
};

let controlModifier = false;
let shiftModifier = false;

let editorAxisWidth = 3;

let editorXAxisColor = [255, 0, 0, 255];
let editorYAxisColor = [0, 255, 0, 255];
let editorZAxisColor = [0, 0, 255, 255];

let editorXMovColor = [255, 0, 0, 255];
let editorYMovColor = [0, 255, 0, 255];
let editorZMovColor = [0, 0, 255, 255];

let editorXAxisMarkerObj = null;
let editorYAxisMarkerObj = null;
let editorZAxisMarkerObj = null;

let editorXMovMarkerObj = null;
let editorYMovMarkerObj = null;
let editorZMovMarkerObj = null;

let editorXAxisActive = false;
let editorYAxisActive = false;
let editorZAxisActive = false;

let editorXMovActive = false;
let editorYMovActive = false;
let editorZMovActive = false;

let editorAxisMemoryPosition = new mp.Vector3();
let IndexMem = 0;
let LODDist = 65535; //65535 = max
let ToggleArrowKeyMovement = true;
let AxisMem = 0;
let editorFocusObjectCollision = true;
let editorFocusObjectFreeze = true;
let editorDragMode = false;

let sc = mp.game.graphics.requestScaleformMovie("instructional_buttons");
let scInst = 0;

function AddInstructionalStart()
{
	scInst = 0;
	mp.game.graphics.drawScaleformMovieFullscreen(sc, 255, 255, 255, 0, false);
    mp.game.graphics.pushScaleformMovieFunction(sc, "CLEAR_ALL");
    mp.game.graphics.popScaleformMovieFunctionVoid();
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_CLEAR_SPACE");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(200);
    mp.game.graphics.popScaleformMovieFunctionVoid();
}

function AddInstructionalButton(text, button) //this shit brazy
{
	mp.game.graphics.pushScaleformMovieFunction(sc, "SET_DATA_SLOT");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(scInst);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(button);
	mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
    mp.game.graphics.popScaleformMovieFunctionVoid();
	scInst++;
}

function AddInstructionalButtonCustom(text, button)
{
	mp.game.graphics.pushScaleformMovieFunction(sc, "SET_DATA_SLOT");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(scInst);
    mp.game.graphics.pushScaleformMovieFunctionParameterString(button);
	mp.game.graphics.pushScaleformMovieFunctionParameterString(text);
    mp.game.graphics.popScaleformMovieFunctionVoid();
	scInst++;
}

function AddInstructionalEnd(type)
{
	mp.game.graphics.pushScaleformMovieFunction(sc, "DRAW_INSTRUCTIONAL_BUTTONS");
	mp.game.graphics.pushScaleformMovieFunctionParameterInt(type);
    mp.game.graphics.popScaleformMovieFunctionVoid();
    mp.game.graphics.pushScaleformMovieFunction(sc, "SET_BACKGROUND_COLOUR");
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(192);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(57);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(43);
    mp.game.graphics.pushScaleformMovieFunctionParameterInt(65);
    mp.game.graphics.popScaleformMovieFunctionVoid();
}

function GetCameraHitCoord()
{
	let position = editorCamera.getCoord();
	let direction = editorCamera.getDirection();
	let farAway = new mp.Vector3((direction.x * 150) + position.x, (direction.y * 150) + position.y, (direction.z * 150) + position.z);
	
	let hitData = mp.raycasting.testPointToPoint(position, farAway, mp.players.local);
	
	if(hitData != undefined)
	{
		return hitData;
	}
	return null;
}

function GetCameraHitCoordObjs(nonragemp = false)
{
	let position = editorCamera.getCoord();
	let direction = editorCamera.getDirection();
	let farAway = new mp.Vector3((direction.x * 150) + position.x, (direction.y * 150) + position.y, (direction.z * 150) + position.z);
	
    let hitData = null;
    
    //1 = trees and some weird objects
    //16 = objects in general
    //256 = vegetation

    //still cant find out why street signs dont raycast with even -1

    hitData = mp.raycasting.testPointToPoint(position, farAway, mp.players.local, 1 | 16 | 256);
	
    if(hitData != undefined)
    {
        if(!nonragemp)
        {
            if(IsObjectSpawned(hitData.entity) || IsAnAxisObject(hitData.entity))
                return hitData;
        }
        else
        {
            return hitData;
        }
    }
    return null;
}

function IsAnAxisObject(obj)
{
    if(obj === editorXAxisMarkerObj)
        return true;
    else if(obj === editorYAxisMarkerObj)
        return true;
    else if(obj === editorZAxisMarkerObj)
        return true;
    else if(obj === editorXMovMarkerObj)
        return true;
    else if(obj === editorYMovMarkerObj)
        return true;
    else if(obj === editorZMovMarkerObj)
        return true;
    return false;
}

function GetNormalizedVector(vector)
{
	let mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y + vector.z * vector.z);
	vector.x = vector.x / mag;
	vector.y = vector.y / mag;
	vector.z = vector.z / mag;
	return vector;
}

function GetCrossProduct(v1, v2)
{
	let vector = new mp.Vector3(0, 0, 0);
	vector.x = v1.y * v2.z - v1.z * v2.y;
	vector.y = v1.z * v2.x - v1.x * v2.z;
	vector.z = v1.x * v2.y - v1.y * v2.x;
	return vector;
}

function ObjectNotNull(obj)
{
    if(obj == null)
        return false;
    if(!mp.objects.exists(obj))
        return false;
    return true;
}

function ClampValue(number, min, max)
{
    return number <= min ? min : number >= max ? max : number;
}

function GetDotProduct(v1, v2)
{
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
}

function GetVectorLength(v1)
{
    return Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
}

function GetAngleBetweenTwoVectors(v1, v2)
{
    return Math.acos(GetDotProduct(GetNormalizedVector(v1), GetNormalizedVector(v2)));
}

function GetDistanceBetweenTwoVectors(v1, v2)
{
    return Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y) + (v1.z - v2.z) * (v1.z - v2.z));
}

//might use later
function DistanceBetweenTwoPoints(x0, x1, y0, y1) 
{
    let dist = (Math.sqrt(((x1 - x0) * (x1 - x0)) + ((y1 - y0) * (y1 - y0))));
    return Math.round(dist * 100) / 100;
}

//might use later
function GetVelocity(startX, startY, startTime, endX, endY, endTime) 
{
    let distance = DistanceBetweenTwoPoints(startX, endX, startY, endY);
    return (distance / (endTime - startTime));
}

//might use later
function getMidpoint(x0, x1, y0, y1) 
{
    return { x: ((x0 + x1) / 2), y: ((y0 + y1) / 2) };
}

//might use later
function GetAngle(originX, originY, projectX, projectY)
{
	let angle = Math.atan2(projectY - originY, projectX - originX) * ((180) / Math.PI);
	return 360 - ((angle < 0) ? (360 + angle) : angle);
}

//might use later
function GetAngularDistance(start, end)
{
	let angle = (end - start) % 360;
	let sign = (angle < 0) ? 1 : -1;
	
	angle = Math.abs(angle);
	return (angle > 180) ? sign * (360 - angle) : sign * angle;
}

//might use later
function GetCenterPointOfVectors(...vecs)
{
	let pos = new mp.Vector3();
	let i = 0;
	for(i = 0; i < vecs.length; i++)
	{
		pos.x += vecs[i].x;
		pos.y += vecs[i].y;
		pos.z += vecs[i].z;
	}
	
	pos.x /= vecs.length;
	pos.y /= vecs.length;
	pos.z /= vecs.length;
	return pos;
}

function CreateMovMarkerObjs()
{
    DestroyMovMarkerObjs();

    editorXMovMarkerObj = mp.objects.new(1574107526, mp.players.local.position, new mp.Vector3(), 255, 0);
	editorYMovMarkerObj = mp.objects.new(1574107526, mp.players.local.position, new mp.Vector3(), 255, 0);
	editorZMovMarkerObj = mp.objects.new(1574107526, mp.players.local.position, new mp.Vector3(), 255, 0);
	editorXMovMarkerObj.setLodDist(LODDist);
	editorYMovMarkerObj.setLodDist(LODDist);
    editorZMovMarkerObj.setLodDist(LODDist);
    editorXMovMarkerObj.freezePosition(true);
	editorXMovMarkerObj.setCollision(false, false);
	editorYMovMarkerObj.freezePosition(true);
	editorYMovMarkerObj.setCollision(false, false);
	editorZMovMarkerObj.freezePosition(true);
    editorZMovMarkerObj.setCollision(false, false);
    mp.game.invoke(Natives.SET_ENTITY_ALPHA, editorXMovMarkerObj.handle, 0, false);
	mp.game.invoke(Natives.SET_ENTITY_ALPHA, editorYMovMarkerObj.handle, 0, false);
    mp.game.invoke(Natives.SET_ENTITY_ALPHA, editorZMovMarkerObj.handle, 0, false);
    
    editorXMovColor = [255, 0, 0, 255];
    editorYMovColor = [0, 255, 0, 255];
    editorZMovColor = [0, 0, 255, 255];
    editorXMovActive = false;
    editorYMovActive = false;
    editorZMovActive = false;
}

function DestroyMovMarkerObjs()
{
    if(editorXMovMarkerObj != null)
    {
        if(mp.objects.exists(editorXMovMarkerObj))
        {
            editorXMovMarkerObj.destroy();
        }
    }
    if(editorYMovMarkerObj != null)
    {
        if(mp.objects.exists(editorYMovMarkerObj))
        {
            editorYMovMarkerObj.destroy();
        }
    }
    if(editorZMovMarkerObj != null)
    {
        if(mp.objects.exists(editorZMovMarkerObj))
        {
            editorZMovMarkerObj.destroy();
        }
    }

    editorXMovMarkerObj = null;
    editorYMovMarkerObj = null;
    editorZMovMarkerObj = null;
}

function ToggleAxisMarkerObjColl(toggle)
{
    if(ObjectNotNull(editorXAxisMarkerObj) && ObjectNotNull(editorYAxisMarkerObj) && ObjectNotNull(editorZAxisMarkerObj))
    {
        editorXAxisMarkerObj.setCollision(toggle, false);
        editorYAxisMarkerObj.setCollision(toggle, false);
        editorZAxisMarkerObj.setCollision(toggle, false);
    }
    editorXAxisColor = [255, 0, 0, 255];
    editorYAxisColor = [0, 255, 0, 255];
    editorZAxisColor = [0, 0, 255, 255];
}

function ToggleMovMarkerObjColl(toggle)
{
    if(ObjectNotNull(editorXMovMarkerObj) && ObjectNotNull(editorYMovMarkerObj) && ObjectNotNull(editorZMovMarkerObj))
    {
        editorXMovMarkerObj.setCollision(toggle, false);
        editorYMovMarkerObj.setCollision(toggle, false);
        editorZMovMarkerObj.setCollision(toggle, false);
    }

    editorXMovColor = [255, 0, 0, 255];
    editorYMovColor = [0, 255, 0, 255];
    editorZMovColor = [0, 0, 255, 255];
}

function CreateAxisMarkerObjs()
{
    DestroyAxisMarkerObjs();

    editorXAxisMarkerObj = mp.objects.new(-263709501, mp.players.local.position, new mp.Vector3(), 255, 0);
	editorYAxisMarkerObj = mp.objects.new(-263709501, mp.players.local.position, new mp.Vector3(0, 90, 0), 255, 0);
	editorZAxisMarkerObj = mp.objects.new(-263709501, mp.players.local.position, new mp.Vector3(), 255, 0);
	editorXAxisMarkerObj.setLodDist(LODDist);
	editorYAxisMarkerObj.setLodDist(LODDist);
    editorZAxisMarkerObj.setLodDist(LODDist);
    editorXAxisMarkerObj.freezePosition(true);
	editorXAxisMarkerObj.setCollision(false, false);
	editorYAxisMarkerObj.freezePosition(true);
	editorYAxisMarkerObj.setCollision(false, false);
	editorZAxisMarkerObj.freezePosition(true);
    editorZAxisMarkerObj.setCollision(false, false);
    editorXAxisMarkerObj.setRotation(0, 0, 0, 2, true);
	editorYAxisMarkerObj.setRotation(90, 0, 0, 2, true);
	editorZAxisMarkerObj.setRotation(0, 90, 0, 2, true);
    mp.game.invoke(Natives.SET_ENTITY_ALPHA, editorXAxisMarkerObj.handle, 0, false);
	mp.game.invoke(Natives.SET_ENTITY_ALPHA, editorYAxisMarkerObj.handle, 0, false);
    mp.game.invoke(Natives.SET_ENTITY_ALPHA, editorZAxisMarkerObj.handle, 0, false);
    
    editorXAxisColor = [255, 0, 0, 255];
    editorYAxisColor = [0, 255, 0, 255];
    editorZAxisColor = [0, 0, 255, 255];
    editorXAxisActive = false;
    editorYAxisActive = false;
    editorZAxisActive = false;
}

function DestroyAxisMarkerObjs()
{
    if(ObjectNotNull(editorXAxisMarkerObj))
        editorXAxisMarkerObj.destroy();
    if(ObjectNotNull(editorYAxisMarkerObj))
        editorYAxisMarkerObj.destroy();
    if(ObjectNotNull(editorZAxisMarkerObj))
        editorZAxisMarkerObj.destroy();

    editorXAxisMarkerObj = null;
    editorYAxisMarkerObj = null;
    editorZAxisMarkerObj = null;
}

function CreateFocusObject(hash = null)
{
    DestroyFocusObject();

    if(hash == null)
    {
        let oldIndex = IndexMem;
        while(!mp.game.streaming.isModelInCdimage(mp.game.joaat(objData[IndexMem])) || !mp.game.streaming.isModelValid(mp.game.joaat(objData[IndexMem])))
        {
            if(IndexMem >= objData.length)
                IndexMem = 0;
            IndexMem++;
        }

        if(oldIndex !== IndexMem)
        {
            mp.gui.chat.push("Index adjusted to " + IndexMem + " due to object error.");
        }

        mp.game.streaming.requestModel(mp.game.joaat(objData[IndexMem]));
        let i = 0;
        for(i = 0; i < 10; i ++)
        {
            if(IndexMem + i < objData.length)
            {
                mp.game.streaming.requestModel(mp.game.joaat(objData[IndexMem + i]));
            }
            if(IndexMem - i >= 0)
            {
                mp.game.streaming.requestModel(mp.game.joaat(objData[IndexMem - i]));
            }
        }
        while(!mp.game.streaming.hasModelLoaded(mp.game.joaat(objData[IndexMem])))
        {
            PrepareClientView(); //flicker now u bastard
            mp.game.wait(0);
        }
        
        editorFocusObject = mp.objects.new(mp.game.joaat(objData[IndexMem]), mp.players.local.position, new mp.Vector3(), 255, 0);
        editorFocusObject.cmapcoll = true;
        editorFocusObject.cmapfreeze = true;
        editorFocusObject.setLodDist(LODDist);
        editorFocusObject.freezePosition(true);
        editorFocusObject.setCollision(false, false);
        mp.game.invoke(Natives.SET_ENTITY_ALPHA, editorFocusObject.handle, editorTransparencySelect, false);
    }
    else
    {
        if(mp.game.streaming.isModelInCdimage(hash) && mp.game.streaming.isModelValid(hash))
        {
            mp.game.streaming.requestModel(hash);
            while(!mp.game.streaming.hasModelLoaded(hash))
            {
                PrepareClientView(); //flicker now u bastard
                mp.game.wait(0);
            }
            editorFocusObject = mp.objects.new(hash, mp.players.local.position, new mp.Vector3(), 255, 0);
            editorFocusObject.cmapcoll = true;
            editorFocusObject.cmapfreeze = true;
            editorFocusObject.setLodDist(LODDist);
            editorFocusObject.freezePosition(true);
            editorFocusObject.setCollision(false, false);
            mp.game.invoke(Natives.SET_ENTITY_ALPHA, editorFocusObject.handle, editorTransparencySelect, false);
        }
        else
        {
            mp.gui.chat.push("Invalid Hash");
        }
    }
}

function DestroyFocusObject()
{
    if(editorFocusObject != null)
    {
        if(mp.objects.exists(editorFocusObject))
            editorFocusObject.destroy();
    }
    editorFocusObject = null;
}

function IsObjectSpawned(obj)
{
    if(obj == null)
        return false;
    let i = 0;
    for(i = 0; i < editorObjects.length; i++)
    {
        if(editorObjects[i] == obj)
            return true;
    }
    return false;
}

let timer = null;

clearInterval(timer)

function StartMapEditor()
{

	editorCamera = mp.cameras.new('default', new mp.Vector3(mp.players.local.position.x, mp.players.local.position.y, mp.players.local.position.z), mp.game.cam.getGameplayCamRot(2), 45);
	editorCamera.setActive(true);
	mp.game.cam.renderScriptCams(true, false, 0, true, false);
	mp.players.local.freezePosition(true);
	mp.players.local.setInvincible(true);
    mp.players.local.setVisible(false, false);
    mp.players.local.setCollision(false, false);

    //CreateFocusObject();
    //CreateAxisMarkerObjs();
    //CreateMovMarkerObjs();
	
    editorAxisMemoryPosition = mp.players.local.position;
    editorState = 0;

    timer = setInterval(function()
    {
        if(editorObjects.length === 0)
            return;
        let mapData = [];
        let i = 0;
        for(i = 0; i < editorObjects.length; i++)
        {
            if(ObjectNotNull(editorObjects[i]))
            {
                let pos = editorObjects[i].getCoords(true);
                let rot = editorObjects[i].getRotation(2);
                let coll = editorObjects[i].cmapcoll;
                let frz = editorObjects[i].cmapfreeze;
                mapData.push({model : editorObjects[i].getModel(), x: pos.x, y: pos.y, z: pos.z, rx: rot.x, ry: rot.y, rz: rot.z, col: !!coll, freeze: !!frz});
            }
        }
        mp.events.callRemote("MapEditor_Save", "autosave", JSON.stringify(mapData, null, " ") + "");
    }, 30000);
}

function EndMapEditor()
{
    clearInterval(timer);
    if(editorCamera != null)
	{
        mp.players.local.position = editorCamera.getCoord();
        mp.players.local.setHeading(editorCamera.getRot(2).z);
        editorCamera.destroy(true);
        editorCamera = null;
    }

    mp.game.cam.renderScriptCams(false, false, 0, true, false);

    mp.players.local.freezePosition(false);
	mp.players.local.setInvincible(false);
    mp.players.local.setVisible(true, false);
    mp.players.local.setCollision(true, false);
    
    DestroyFocusObject();
    DestroyAxisMarkerObjs();
    DestroyMovMarkerObjs();

    editorXAxisColor = [255, 0, 0, 255];
	editorYAxisColor = [0, 255, 0, 255];
    editorZAxisColor = [0, 0, 255, 255];
    editorXMovColor = [255, 0, 0, 255];
	editorYMovColor = [0, 255, 0, 255];
    editorZMovColor = [0, 0, 255, 255];
    
    undoEditorObjects = [];
}

mp.keys.bind(bindKeys.KEY_F2, false, function()
{
    editorStart = !editorStart;

    if(chat)
        return;

    if(editorStart)
    {
        mp.game.ui.displayRadar(false);
        StartMapEditor();
    }
    else
    {
        mp.game.ui.displayRadar(true);
        EndMapEditor();
    }
});

mp.keys.bind(bindKeys.KEY_SAVE, false, function()
{
    if(!editorStart)
        return;

    mp.gui.chat.push("Type '/msave name' to save your map.");
    mp.gui.chat.push("Please note that your map is autosaved every few seconds!");
    mp.gui.chat.push("To load that type '/mload autosave'");
});

mp.keys.bind(bindKeys.KEY_SPACE, false, function()
{
    if(!editorStart)
        return;

    if(chat)
        return;

    if(editorState == 2)
    {
        ToggleArrowKeyMovement = !ToggleArrowKeyMovement;
    }
});

mp.events.add("playerCommand", (command) => 
{
    if(!editorStart)
        return;

	let args = command.split(/[ ]+/);
	let commandName = args[0];

    args.shift();

    if(commandName === "msave")
    {
        if(args.length === 0)
        {
            mp.gui.chat.push("Please enter a valid name");
        }
        else if(args[0] === "autosave")
        {
            mp.gui.chat.push("Please enter a valid name");
        }
        else
        {
            let mapData = [];
            let i = 0;
            for(i = 0; i < editorObjects.length; i++)
            {
                if(ObjectNotNull(editorObjects[i]))
                {
                    let pos = editorObjects[i].getCoords(true);
                    let rot = editorObjects[i].getRotation(2);
                    let coll = editorObjects[i].cmapcoll;
                    let frz = editorObjects[i].cmapfreeze;
                    mapData.push({model : editorObjects[i].getModel(), x: pos.x, y: pos.y, z: pos.z, rx: rot.x, ry: rot.y, rz: rot.z, col: !!coll, freeze: !!frz});
                }
            }
            mp.gui.chat.push("save LEN: " + editorObjects.length);
            mp.events.callRemote("MapEditor_Save", args[0], JSON.stringify(mapData, null, " ") + "");
            mp.gui.chat.push("Map saved!");
        }
    }
    else if(commandName === "mclear")
	{
        let i = 0;
        for(i = 0; i < editorObjects.length; i++)
        {
            if(ObjectNotNull(editorObjects[i]))
            {
                editorObjects[i].destroy();
            }
        }
        editorObjects = [];
        mp.gui.chat.push("Map editor cleared!");
    }
    else if(commandName === "mload")
	{
        if(args.length === 0)
        {
            mp.gui.chat.push("Please enter a valid name");
            return;
        }
        let i = 0;
        for(i = 0; i < editorObjects.length; i++)
        {
            if(ObjectNotNull(editorObjects[i]))
            {
                editorObjects[i].destroy();
            }
        }
        editorObjects = [];
        mp.events.callRemote("MapEditor_Load", args[0]);
        mp.gui.chat.push("Map loaded!");
    }
    else if(commandName === "mindx")
	{
        if(args.length === 0)
        {
            mp.gui.chat.push("Please enter a valid index (Max: " + objData.length + ")");
            return;
        }
        if(isNaN(args[0]))
        {
            mp.gui.chat.push("Please enter a valid index (Max: " + objData.length + ")");
            return;
        }

        if(parseInt(args[0]) < 0 || parseInt(args[0]) >= objData.length)
        {
            mp.gui.chat.push("Please enter a valid index (Max: " + objData.length + ")");
            return;
        }
        IndexMem = parseInt(args[0]);
        CreateFocusObject();
        AxisMem = 0;
    }
    else if(commandName === "mcmds")
    {
        mp.gui.chat.push("Editor Commands: medit [name], msave [name], mload [name]");
        mp.gui.chat.push("Editor Commands: mindx [index], mobj [hash], mlmaps");
        mp.gui.chat.push("Editor Commands: mdeload [name], mmaps, mclear");
    }
    else if(commandName === "mdeload")
	{
        if(args.length === 0)
        {
            mp.gui.chat.push("Please enter a valid name");
            return;
        }
        let i = 0;
        for(i = 0; i < editorObjects.length; i++)
        {
            if(ObjectNotNull(editorObjects[i]))
            {
                editorObjects[i].destroy();
            }
        }
        editorObjects = [];
        mp.events.callRemote("MapEditor_Deload", args[0]);
        mp.gui.chat.push("Map deloaded!");
    }
    else if(commandName === "medit")
	{
        if(args.length === 0)
        {
            mp.gui.chat.push("Please enter a valid name");
            return;
        }
        let i = 0;
        for(i = 0; i < editorObjects.length; i++)
        {
            if(ObjectNotNull(editorObjects[i]))
            {
                editorObjects[i].destroy();
            }
        }
        editorObjects = [];
        mp.events.callRemote("MapEditor_Edit", args[0]);
        mp.gui.chat.push("Map edit mode!");
    }
	else if(commandName === "mmaps")
	{
		mp.events.callRemote("MapEditor_Maps");
    }
    else if(commandName === "mlmaps")
    {
        mp.events.callRemote("MapEditor_Maps_Loaded");
    }
    else if(commandName === "mobj")
	{
		if(args.length == 0)
		{
			mp.gui.chat.push("Invalid object");
		}
		else
		{
            if(!isNaN(args[0]))
            {
                if(!mp.game.streaming.isModelInCdimage(parseInt(args[0])) || !mp.game.streaming.isModelValid(parseInt(args[0])))
                {
                    mp.gui.chat.push("Invalid object");
                }
                else
                {
                    CreateFocusObject(parseInt(args[0]));
                    AxisMem = 0;
                    if(memObj != null)
                    {
                        if(memObj.handle != null)
                            mp.game.invoke(Natives.RESET_ENTITY_ALPHA, memObj.handle);
                        else
                            mp.game.invoke(Natives.RESET_ENTITY_ALPHA, memObj);
                        memObj = null;
                    }
                    editorState = 1;
                    editorDragMode = false;

                    CreateAxisMarkerObjs();
                    CreateMovMarkerObjs();
                }
            }
            else
            {
                if(!mp.game.streaming.isModelInCdimage(mp.game.joaat(args[0])) || !mp.game.streaming.isModelValid(mp.game.joaat(args[0])))
                {
                    mp.gui.chat.push("Invalid object");
                }
                else
                {
                    CreateFocusObject(mp.game.joaat(args[0]));
                    AxisMem = 0;
                    if(memObj != null)
                    {
                        if(memObj.handle != null)
                            mp.game.invoke(Natives.RESET_ENTITY_ALPHA, memObj.handle);
                        else
                            mp.game.invoke(Natives.RESET_ENTITY_ALPHA, memObj);
                        memObj = null;
                    }
                    editorState = 1;
                    editorDragMode = false;

                    CreateAxisMarkerObjs();
                    CreateMovMarkerObjs();
                }
            }
		}
	}
});

mp.keys.bind(bindKeys.KEY_1, false, function()
{
    if(!editorStart)
        return;

    if(chat)
        return;

    editorState = 0;
    editorDragMode = false;

    DestroyAxisMarkerObjs();
    DestroyMovMarkerObjs();
    if(ObjectNotNull(editorFocusObject))
    {
        if(!IsObjectSpawned(editorFocusObject))
        {
            DestroyFocusObject();
        }
        else
        {
            mp.game.invoke(Natives.RESET_ENTITY_ALPHA, editorFocusObject.handle);
            editorFocusObject.freezePosition(true);
            editorFocusObject.setCollision(true, false);
            editorFocusObject = null;
        }
    }
});

mp.keys.bind(bindKeys.KEY_2, false, function()
{
    if(!editorStart)
        return;
    if(chat)
        return;
    
    if(memObj != null)
    {
        if(memObj.handle != null)
            mp.game.invoke(Natives.RESET_ENTITY_ALPHA, memObj.handle);
        else
            mp.game.invoke(Natives.RESET_ENTITY_ALPHA, memObj);
        memObj = null;
    }

    editorState = 1;
    editorDragMode = false;

    CreateAxisMarkerObjs();
    CreateMovMarkerObjs();
    
    if(editorFocusObject === null)
    {
        CreateFocusObject();
    }
});

mp.keys.bind(bindKeys.KEY_3, false, function()
{
    if(!editorStart)
        return;
    if(chat)
        return;

    if(memObj != null)
    {
        if(memObj.handle != null)
            mp.game.invoke(Natives.RESET_ENTITY_ALPHA, memObj.handle);
        else
            mp.game.invoke(Natives.RESET_ENTITY_ALPHA, memObj);
        memObj = null;
    }

    editorState = 2;
    editorDragMode = false;

    CreateAxisMarkerObjs();
    CreateMovMarkerObjs();
    ToggleAxisMarkerObjColl(true);
    ToggleMovMarkerObjColl(true);
    
    if(editorFocusObject === null)
    {
        CreateFocusObject();
    }
});

mp.keys.bind(bindKeys.KEY_ENTER, false, function()
{
    if(!editorStart)
        return;

    if(chat)
        return;

    if(editorState === 0)
        return;

    if(editorFocusObject == null)
        return;

    if(IsObjectSpawned(editorFocusObject))
    {
        mp.game.invoke(Natives.RESET_ENTITY_ALPHA, editorFocusObject.handle);
        editorFocusObject.setCollision(true, false);
        editorFocusObject.cmapcoll = editorFocusObjectCollision;
        editorFocusObject.cmapfreeze = editorFocusObjectFreeze;
        editorFocusObjectCollision = true;
        editorFocusObjectFreeze = true;
        while(!mp.game.streaming.isModelInCdimage(mp.game.joaat(objData[IndexMem])) || !mp.game.streaming.isModelValid(mp.game.joaat(objData[IndexMem])))
        {
            IndexMem++;
            if(IndexMem >= objData.length)
                IndexMem = 0;
        }
        
        editorFocusObject = null;
        //CreateFocusObject();
        AxisMem = 0;
        editorState = 2;
    }
    else
    {
        mp.game.invoke(Natives.RESET_ENTITY_ALPHA, editorFocusObject.handle);
        editorFocusObject.setCollision(true, false);
        editorFocusObject.cmapcoll = editorFocusObjectCollision;
        editorFocusObject.cmapfreeze = editorFocusObjectFreeze;
        editorObjects.push(editorFocusObject);
        editorFocusObjectCollision = true;
        editorFocusObjectFreeze = true;

        while(!mp.game.streaming.isModelInCdimage(mp.game.joaat(objData[IndexMem])) || !mp.game.streaming.isModelValid(mp.game.joaat(objData[IndexMem])))
        {
            IndexMem++;
            if(IndexMem >= objData.length)
                IndexMem = 0;
        }
        
        editorFocusObject = null;
        //CreateFocusObject();
        AxisMem = 0;
        editorState = 2;
    }
});

//----------chat----
let chat = false;
let timerStopped = true;
let chatTimr = null; 

mp.keys.bind(0x54, false, (player) => 
{
    if(!editorStart)
    {
        chat = false;
        timerStopped = false;
        if(chatTimr != null)
        {
            cancelInterval(chatTimr);
            chatTimr = null;
        }
        return;
    }

    if (!chat) 
    {
        timerStopped = true;
        chat = true;
        if(chatTimr != null)
        {
            cancelInterval(chatTimr);
            chatTimr = null;
        }
    }
});

mp.keys.bind(bindKeys.KEY_ENTER, false, (player) => 
{
    if(!editorStart)
    {
        chat = false;
        timerStopped = false;
        if(chatTimr != null)
        {
            cancelInterval(chatTimr);
            chatTimr = null;
        }
        return;
    }

    if (chat) 
    {
        if(!timerStopped)
            return;
        timerStopped = false;
        chatTimr = setTimeout(function() 
        {
            chatTimr = null;
            chat = false;
            timerStopped = true;
        }, 100);
    }
});
//----------------------

mp.keys.bind(bindKeys.KEY_C, false, function()
{
    if(!editorStart)
        return;
    if(chat)
        return;
    editorFocusObjectCollision = !editorFocusObjectCollision;
    if(ObjectNotNull(editorFocusObject))
    {
        editorFocusObject.cmapcoll = !!editorFocusObjectCollision;
    }
});

mp.keys.bind(bindKeys.KEY_F, false, function()
{
    if(!editorStart)
        return;
    if(chat)
        return;
    editorFocusObjectFreeze = !editorFocusObjectFreeze;
    if(ObjectNotNull(editorFocusObject))
    {
        editorFocusObject.cmapfreeze = !!editorFocusObjectFreeze;
    }
});

mp.keys.bind(bindKeys.KEY_DELETE, false, function()
{
    if(!editorStart)
        return;
    if(chat)
        return;
    if(IsObjectSpawned(editorFocusObject))
    {
        let indx = editorObjects.indexOf(editorFocusObject);
        if(indx > -1)
        {
            editorObjects.splice(indx, 1);
        }
    }

    DestroyFocusObject();
    DestroyAxisMarkerObjs();
    DestroyMovMarkerObjs();

    editorState = 0;
});

mp.keys.bind(bindKeys.KEY_UNDO, false, function()
{
    if(!editorStart)
        return;
    if(chat)
        return;
    if(!controlModifier)
        return;
        
    if(editorObjects.length > 0)
    {
        let obj = editorObjects.pop();
        undoEditorObjects.push({model: obj.getModel(), position: obj.getCoords(true), rotation: obj.getRotation(2)});
        obj.destroy();
    }
});


mp.keys.bind(bindKeys.KEY_REDO, false, function()
{
    if(!editorStart)
        return;
    if(chat)
        return;
    if(!controlModifier)
        return;
    
    if(undoEditorObjects.length > 0)
    {
        let data = undoEditorObjects.pop();
        let newObj = mp.objects.new(data.model, data.position, new mp.Vector3(), 255, 0);
        newObj.setRotation(data.rotation.x, data.rotation.y, data.rotation.z, 2, true);
        newObj.setLodDist(LODDist);
        newObj.freezePosition(true);
        newObj.setCollision(true, false);
        editorObjects.push(newObj);
    }
});

let memObj = null;
function PrepareClientView()
{
    /**
     * Controls to disable
     * 
     * Reference: https://wiki.rage.mp/index.php?title=Controls
     */
    let disabledControls = [14, 15, 16, 17, 12, 13, 37, 261, 262, 241, 242];

    /**
     * HUD elements to hide
     * 
     * Reference: https://wiki.rage.mp/index.php?title=HUD_Components
     */
    let hiddenHudElements = [2, 19, 20];

    // Hide HUD elements
    HideHudElements(hiddenHudElements);

    // Disable controls
    DisableControlActions(disabledControls);

    // Show HUD_RETICLE
    mp.game.ui.showHudComponentThisFrame(14);
}

/**
 * Disable control actions from array
 * 
 * @param array array 
 */
function DisableControlActions(array)
{
    for (let control of array) {
        mp.game.controls.disableControlAction(0, control, true);
    }
}

/**
 * Disable HUD elements from array
 * 
 * @param array array 
 */
function HideHudElements(array)
{
    for (let element of array) {
        mp.game.ui.hideHudComponentThisFrame(element);
    }
}

mp.events.add("render", () =>
{
    if(!editorStart)
        return;
    
    if(chat)
        return;

    PrepareClientView();

    if(mp.keys.isDown(17))
    {
        controlModifier = true;
    }
    else
    {
        controlModifier = false;
    }

    if(mp.keys.isDown(16))
    {
        shiftModifier = true;
    }
    else
    {
        shiftModifier = false;
    }

    let rot = editorCamera.getRot(2);

    if(editorState == 0)
    {
        mp.game.ui.setTextFont(7);
        mp.game.ui.setTextEntry2("STRING");
        //mp.game.invoke(Natives.GET_ENTITY_MODEL, entity),
        if(memObj != null)
        {
            if(memObj.model != null)
            {
                mp.game.ui.addTextComponentSubstringPlayerName("[Editor Object]: " + memObj.model);
            }
            else
            {
                mp.game.ui.addTextComponentSubstringPlayerName("[Invalid Object]: " + mp.game.invoke(Natives.GET_ENTITY_MODEL, memObj));
            }
        }
        else
            mp.game.ui.addTextComponentSubstringPlayerName("Selector Mode");
		mp.game.ui.drawSubtitleTimed(1, true);
        AddInstructionalStart();
        AddInstructionalButtonCustom("Exit Editor", "t_F2");
        AddInstructionalButtonCustom("Save Map", "t_F4");
        AddInstructionalButtonCustom("Placement Mode", "t_2");
        AddInstructionalButtonCustom("Adjustment Mode", "t_3");
        AddInstructionalButton("Duplicate Object", 101);
        AddInstructionalButton("Select Object", 100);
        AddInstructionalEnd(1);
        
        let newObj = GetCameraHitCoordObjs(true);

        if(newObj == null)
		{
			if(memObj != null)
			{
                if(memObj.handle != null)
                    mp.game.invoke(Natives.RESET_ENTITY_ALPHA, memObj.handle);
                else
                    mp.game.invoke(Natives.RESET_ENTITY_ALPHA, memObj);
				editorFocusObject = null;
				memObj = null;
			}
        }
        else
        {
            if(memObj != null)
            {
                if(memObj.handle != null)
                    mp.game.invoke(Natives.RESET_ENTITY_ALPHA, memObj.handle);
                else
                    mp.game.invoke(Natives.RESET_ENTITY_ALPHA, memObj);
            }
            
            if(newObj.entity.handle != null)
                mp.game.invoke(Natives.SET_ENTITY_ALPHA, newObj.entity.handle, editorTransparencySelect, false);
            else
                mp.game.invoke(Natives.SET_ENTITY_ALPHA, newObj.entity, editorTransparencySelect, false);
            
            memObj = newObj.entity;
            
            if(memObj.handle != null)
            {
                if(mp.game.controls.isDisabledControlJustReleased(0, 24))
                {
                    editorFocusObject = memObj;
                    let rot = editorFocusObject.getRotation(2);
                    AxisMem = rot.z;
                    editorFocusObject.setCollision(false, false);
                    memObj = null;

                    CreateAxisMarkerObjs();
                    CreateMovMarkerObjs();
                    ToggleAxisMarkerObjColl(true);
                    ToggleMovMarkerObjColl(true);

                    editorState = 2;
                }
                else if(mp.game.controls.isDisabledControlJustReleased(0, 25))
                {
                    mp.game.invoke(Natives.RESET_ENTITY_ALPHA, memObj.handle);
                    CreateFocusObject(memObj.model);
                    AxisMem = 0;
                    memObj = null;

                    CreateAxisMarkerObjs();
                    CreateMovMarkerObjs();
                    editorState = 1;
                    editorDragMode = false;
                }
            }
            else
            {
                if(mp.game.controls.isDisabledControlJustReleased(0, 25))
                {
                    mp.game.invoke(Natives.RESET_ENTITY_ALPHA, memObj);
                    CreateFocusObject(mp.game.invoke(Natives.GET_ENTITY_MODEL, memObj));
                    AxisMem = 0;
                    memObj = null;

                    CreateAxisMarkerObjs();
                    CreateMovMarkerObjs();

                    editorState = 1;
                    editorDragMode = false;
                }
            }
        }
    }
    else
    {
        if(editorFocusObject === null)
            CreateFocusObject();

        if(editorState == 1)
        {
            mp.game.ui.setTextFont(7);
            mp.game.ui.setTextEntry2("STRING");
            mp.game.ui.addTextComponentSubstringPlayerName("Index: " + IndexMem + " -> " + objData[IndexMem]);
            mp.game.ui.drawSubtitleTimed(1, true);
            let colvar = editorFocusObject.cmapcoll;
            let frzvar = editorFocusObject.cmapfreeze;
            AddInstructionalStart();
            AddInstructionalButtonCustom("Exit Editor", "t_F2");
            AddInstructionalButtonCustom("Selector Mode", "t_1");
            AddInstructionalButtonCustom("Adjustment Mode", "t_3");
            AddInstructionalButtonCustom("Delete Object", "w_Delete");
            if(colvar != null)
            {
                if(colvar)
                    AddInstructionalButtonCustom("Collision: ON", "t_C");
                else
                    AddInstructionalButtonCustom("Collision: OFF", "t_C");
            }
            else
            {
                AddInstructionalButtonCustom("Collision: ON", "t_C");
            }
            if(frzvar != null)
            {
                if(frzvar)
                    AddInstructionalButtonCustom("Frozen: ON", "t_F");
                else
                    AddInstructionalButtonCustom("Frozen: OFF", "t_F");
            }
            else
            {
                AddInstructionalButtonCustom("Frozen: ON", "t_F");
            }
            AddInstructionalButton("Auto Adjust", 101);
            AddInstructionalButton("Place Object", 100);
            AddInstructionalEnd(1);

            let drawObj = GetCameraHitCoord();
            if(drawObj != null)
            {
                if(mp.game.controls.isDisabledControlJustReleased(0, 22))
                {
                    let curRot = editorFocusObject.getRotation(2);
                    editorFocusObject.setRotation(curRot.x, curRot.y, curRot.z + 90, 2, true);
                    AxisMem += 90;
                }

                if(mp.game.controls.isDisabledControlJustReleased(0, 24))
                {
                    mp.game.invoke(Natives.RESET_ENTITY_ALPHA, editorFocusObject.handle);
                    editorFocusObject.setCollision(true, false);
                    editorFocusObject.cmapcoll = editorFocusObjectCollision;
                    editorFocusObject.cmapfreeze = editorFocusObjectFreeze;
                    let pos = editorFocusObject.getCoords(true);
                    let rot = editorFocusObject.getRotation(2);
                    editorObjects.push(editorFocusObject);
                    editorFocusObjectCollision = true;
                    editorFocusObjectFreeze = true;
                    editorFocusObject = null;
                    CreateFocusObject();
                    AxisMem = 0;
                }

                if(mp.game.controls.isDisabledControlJustReleased(0, 241))
                {
                    IndexMem++;
                    if(IndexMem >= objData.length)
                        IndexMem = 0;
                    
                    if(!IsObjectSpawned(editorFocusObject))
                        DestroyFocusObject();

                    editorFocusObject = null;

                    while(!mp.game.streaming.isModelInCdimage(mp.game.joaat(objData[IndexMem])) || !mp.game.streaming.isModelValid(mp.game.joaat(objData[IndexMem])))
                    {
                        IndexMem++;
                        if(IndexMem >= objData.length)
                            IndexMem = 0;
                    }
                    
                    CreateFocusObject();
                    AxisMem = 0;
                }
                else if(mp.game.controls.isDisabledControlJustReleased(0, 242))
                {
                    IndexMem--;
                    if(IndexMem < 0)
                        IndexMem = objData.length - 1;
                    
                    if(!IsObjectSpawned(editorFocusObject))
                        DestroyFocusObject();

                    editorFocusObject = null;
                    
                    while(!mp.game.streaming.isModelInCdimage(mp.game.joaat(objData[IndexMem])) || !mp.game.streaming.isModelValid(mp.game.joaat(objData[IndexMem])))
                    {
                        IndexMem--;
                        if(IndexMem < 0)
                            IndexMem = objData.length - 1;
                    }
                    
                    CreateFocusObject();
                    AxisMem = 0;
                }

                let height = editorFocusObject.getHeight(editorFocusObject.position.x, editorFocusObject.position.y, editorFocusObject.position.z, false, true);
                drawObj.position.z += height / 2;
                editorFocusObject.setCoordsNoOffset(drawObj.position.x, drawObj.position.y, drawObj.position.z, false, false, false);
                
                let curRot = editorFocusObject.getRotation(2);
                
                if(mp.game.controls.isControlPressed(0, 25))
                {
                    editorFocusObject.placeOnGroundProperly();
                }
                else
                {
                    editorFocusObject.setRotation(curRot.x, curRot.y, curRot.z, 2, true);
                }
                
                editorAxisMemoryPosition = drawObj.position;
            }
        }
        else
        {
            let colvar = editorFocusObject.cmapcoll;
            let frzvar = editorFocusObject.cmapfreeze;
            AddInstructionalStart();
            AddInstructionalButtonCustom("Exit Editor", "t_F2");
            AddInstructionalButtonCustom("Placement Mode", "t_2");
            AddInstructionalButtonCustom("Selector Mode", "t_1");
            if(colvar != null)
            {
                if(colvar)
                    AddInstructionalButtonCustom("Collision: ON", "t_C");
                else
                    AddInstructionalButtonCustom("Collision: OFF", "t_C");
            }
            else
            {
                AddInstructionalButtonCustom("Collision: ON", "t_C");
            }
            if(frzvar != null)
            {
                if(frzvar)
                    AddInstructionalButtonCustom("Frozen: ON", "t_F");
                else
                    AddInstructionalButtonCustom("Frozen: OFF", "t_F");
            }
            else
            {
                AddInstructionalButtonCustom("Frozen: ON", "t_F");
            }
            if(ToggleArrowKeyMovement)
            {
                AddInstructionalButtonCustom("Move Up", "t_+");
                AddInstructionalButtonCustom("Move Down", "t_-");
                AddInstructionalButton("Move Forward", 194);
                AddInstructionalButton("Move Backward", 195);
                AddInstructionalButton("Move Left", 196);
                AddInstructionalButton("Move Right", 197);
            }
            else
            {
                AddInstructionalButtonCustom("Rotate Up", "t_+");
                AddInstructionalButtonCustom("Rotate Down", "t_-");
                AddInstructionalButton("Rotate Forward", 194);
                AddInstructionalButton("Rotate Backward", 195);
                AddInstructionalButton("Rotate Left", 196);
                AddInstructionalButton("Rotate Right", 197);
            }
            AddInstructionalButtonCustom("Toggle Arrow Keys", "w_Space");
            AddInstructionalButtonCustom("Delete Object", "w_Delete");
            AddInstructionalButtonCustom("Save Object", "w_Enter");
            AddInstructionalEnd(1);

            if(ToggleArrowKeyMovement)
            {
                if(mp.keys.isDown(bindKeys.KEY_MINUS))
                {
                    let curPos = editorFocusObject.getCoords(true);
                    let offsetX = editorFocusObject.getOffsetFromInWorldCoords(0, 0, 3);
                    let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                    
                    trueOffset.x *= 0.1;
                    trueOffset.y *= 0.1;
                    trueOffset.z *= 0.1;
                    
                    editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                    editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                }
                if(mp.keys.isDown(bindKeys.KEY_LEFT))
                {
                    let curPos = editorFocusObject.getCoords(true);
                    let offsetX = editorFocusObject.getOffsetFromInWorldCoords(3, 0, 0);
                    let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                    
                    trueOffset.x *= 0.1;
                    trueOffset.y *= 0.1;
                    trueOffset.z *= 0.1;
                    
                    editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                    editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                }
                if(mp.keys.isDown(bindKeys.KEY_PLUS))
                {
                    let curPos = editorFocusObject.getCoords(true);
                    let offsetX = editorFocusObject.getOffsetFromInWorldCoords(0, 0, 3);
                    let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                    
                    trueOffset.x *= -0.1;
                    trueOffset.y *= -0.1;
                    trueOffset.z *= -0.1;
                    
                    editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                    editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                }
                if(mp.keys.isDown(bindKeys.KEY_RIGHT))
                {
                    let curPos = editorFocusObject.getCoords(true);
                    let offsetX = editorFocusObject.getOffsetFromInWorldCoords(3, 0, 0);
                    let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                    
                    trueOffset.x *= -0.1;
                    trueOffset.y *= -0.1;
                    trueOffset.z *= -0.1;
                    
                    editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                    editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                }
                if(mp.keys.isDown(bindKeys.KEY_DOWN))
                {
                    let curPos = editorFocusObject.getCoords(true);
                    let offsetX = editorFocusObject.getOffsetFromInWorldCoords(0, 3, 0);
                    let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                    
                    trueOffset.x *= 0.1;
                    trueOffset.y *= 0.1;
                    trueOffset.z *= 0.1;
                    
                    editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                    editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                }
                if(mp.keys.isDown(bindKeys.KEY_UP))
                {
                    let curPos = editorFocusObject.getCoords(true);
                    let offsetX = editorFocusObject.getOffsetFromInWorldCoords(0, 3, 0);
                    let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                    
                    trueOffset.x *= -0.1;
                    trueOffset.y *= -0.1;
                    trueOffset.z *= -0.1;
                    
                    editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                    editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                }
            }
            else
            {
                if(mp.keys.isDown(bindKeys.KEY_MINUS))
                {
                    let curRot = editorFocusObject.getRotation(2);
                    editorFocusObject.setRotation(curRot.x, curRot.y + -0.1 * 5, curRot.z, 2, true);
                }
                if(mp.keys.isDown(bindKeys.KEY_LEFT))
                {
                    let curRot = editorFocusObject.getRotation(2);
                    editorFocusObject.setRotation(curRot.x, curRot.y, curRot.z + 0.1 * 5, 2, true);
                    AxisMem += 0.1 * 5;
                }
                if(mp.keys.isDown(bindKeys.KEY_PLUS))
                {
                    let curRot = editorFocusObject.getRotation(2);
                    editorFocusObject.setRotation(curRot.x, curRot.y + 0.1 * 5, curRot.z, 2, true);
                }
                if(mp.keys.isDown(bindKeys.KEY_RIGHT))
                {
                    let curRot = editorFocusObject.getRotation(2);
                    editorFocusObject.setRotation(curRot.x, curRot.y, curRot.z + -0.1 * 5, 2, true);
                    AxisMem += -0.1 * 5;
                }
                if(mp.keys.isDown(bindKeys.KEY_DOWN))
                {
                    let curRot = editorFocusObject.getRotation(1);
                    editorFocusObject.setRotation(curRot.x + 0.1 * 5, curRot.y, curRot.z, 1, true);
                }
                if(mp.keys.isDown(bindKeys.KEY_UP))
                {
                    let curRot = editorFocusObject.getRotation(1);
                    editorFocusObject.setRotation(curRot.x + -0.1 * 5, curRot.y, curRot.z, 1, true);
                }
            }

            let drawObj = GetCameraHitCoordObjs();

			if(mp.game.controls.isControlPressed(0, 24))
			{
				editorDragMode = true;
			}
			else if(mp.game.controls.isControlJustReleased(0, 24))
			{
				editorDragMode = false;
            }
            
            if(!editorDragMode)
			{
				if(drawObj != null)
				{
					if(drawObj.entity == editorXAxisMarkerObj)
					{
						editorXAxisColor = [255, 255, 0, 255];
						editorXAxisActive = true;
						editorYAxisActive = false;
						editorZAxisActive = false;
						editorXMovActive = false;
						editorYMovActive = false;
						editorZMovActive = false;
					}
					else
					{
						editorXAxisColor = [255, 0, 0, 255];
						editorXAxisActive = false;
					}
					
					if(drawObj.entity == editorYAxisMarkerObj)
					{
						editorYAxisColor = [255, 255, 0, 255];
						editorXAxisActive = false;
						editorYAxisActive = true;
						editorZAxisActive = false;
						editorXMovActive = false;
						editorYMovActive = false;
						editorZMovActive = false;
					}
					else
					{
						editorYAxisColor = [0, 255, 0, 255];
						editorYAxisActive = false;
					}
					
					if(drawObj.entity == editorZAxisMarkerObj)
					{
						editorZAxisColor = [255, 255, 0, 255];
						editorXAxisActive = false;
						editorYAxisActive = false;
						editorZAxisActive = true;
						editorXMovActive = false;
						editorYMovActive = false;
						editorZMovActive = false;
					}
					else
					{
						editorZAxisColor = [0, 0, 255, 255];
						editorZAxisActive = false;
					}
					
					if(drawObj.entity == editorXMovMarkerObj)
					{
						editorXMovColor = [255, 255, 0, 255];
						editorXMovActive = true;
						editorYMovActive = false;
						editorZMovActive = false;
						editorXAxisActive = false;
						editorYAxisActive = false;
						editorZAxisActive = false;
					}
					else
					{
						editorXMovColor = [255, 0, 0, 255];
						editorXMovActive = false;
					}
					
					if(drawObj.entity == editorYMovMarkerObj)
					{
						editorYMovColor = [255, 255, 0, 255];
						editorXMovActive = false;
						editorYMovActive = true;
						editorZMovActive = false;
						editorXAxisActive = false;
						editorYAxisActive = false;
						editorZAxisActive = false;
					}
					else
					{
						editorYMovColor = [0, 255, 0, 255];
						editorYMovActive = false;
					}
					
					if(drawObj.entity == editorZMovMarkerObj)
					{
						editorZMovColor = [255, 255, 0, 255];
						editorXMovActive = false;
						editorYMovActive = false;
						editorZMovActive = true;
						editorXAxisActive = false;
						editorYAxisActive = false;
						editorZAxisActive = false;
					}
					else
					{
						editorZMovColor = [0, 0, 255, 255];
						editorZMovActive = false;
					}
				}
				else
				{
					editorXMovActive = false;
					editorYMovActive = false;
					editorZMovActive = false;
					editorXAxisActive = false;
					editorYAxisActive = false;
					editorZAxisActive = false;
					editorXAxisColor = [255, 0, 0, 255];
					editorYAxisColor = [0, 255, 0, 255];
					editorZAxisColor = [0, 0, 255, 255];
					editorXMovColor = [255, 0, 0, 255];
					editorYMovColor = [0, 255, 0, 255];
					editorZMovColor = [0, 0, 255, 255];
				}
            }
            else
            {
                //Needs clean up
                if(ObjectNotNull(editorFocusObject))
				{
					let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
					let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
					if(editorXAxisActive)
					{
						let curRot = editorFocusObject.getRotation(2);
						editorFocusObject.setRotation(curRot.x, curRot.y, curRot.z + rightAxisX * 5, 2, true);
						AxisMem += rightAxisX * 5;
					}
					else if(editorYAxisActive)
					{
						let curRot = editorFocusObject.getRotation(2);
                        editorFocusObject.setRotation(curRot.x, curRot.y + rightAxisY * 5, curRot.z, 2, true);
                        editorYAxisMarkerObj.setRotation(0, 0, 0, 2, true);
					}
					else if(editorZAxisActive)
					{
						let curRot = editorFocusObject.getRotation(1);
						editorFocusObject.setRotation(curRot.x + rightAxisY * 5, curRot.y, curRot.z, 1, true);
					}
					else if(editorXMovActive)
					{
                        //Find the angle between the mouse movement vector(center of object[3D to 2D] to mouse coords) and the axis vector(center of object[3D to 2D] to center of axis object[3D to 2D])
                        //If angle is less than 90 degrees, move towards the axis object at a gradual speed
                        //If the angle is greater than 90, move away from the axis object at a gradual speed
						let objp = editorFocusObject.getOffsetFromInWorldCoords(0, 0, 3);
                        let objr = mp.game.graphics.world3dToScreen2d(objp.x, objp.y, objp.z);
                        let curPos = editorFocusObject.getCoords(true);
                        let objr2 = mp.game.graphics.world3dToScreen2d(curPos.x, curPos.y, curPos.z);
                        let objrf = new mp.Vector3(objr.x - objr2.x, objr.y - objr2.y, 0);
                        let mousepos = new mp.Vector3(objr2.x + rightAxisX, objr2.y + rightAxisY, 0);
                        let objrm = new mp.Vector3(mousepos.x - objr2.x, mousepos.y - objr2.y, 0);
                        let angle = GetAngleBetweenTwoVectors(objrf, objrm);
                        if(angle != NaN && !isNaN(angle) && (angle * 180 / Math.PI) <= 80)
                        {
                            let offsetX = editorFocusObject.getOffsetFromInWorldCoords(0, 0, 3);
                            let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                            let offmax = (GetVectorLength(new mp.Vector3(rightAxisX, rightAxisY, 0))) * ((100 - (angle * 180 / Math.PI)) / 100);
                            offmax = ClampValue(offmax, 0.000001, 0.25);
                            trueOffset.x *= -offmax;
                            trueOffset.y *= -offmax;
                            trueOffset.z *= -offmax;
                            editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
						    editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                        }
                        else if(angle != NaN && !isNaN(angle) && (angle * 180 / Math.PI) >= 110)
                        {
                            let offsetX = editorFocusObject.getOffsetFromInWorldCoords(0, 0, 3);
                            let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                            let offmax = (GetVectorLength(new mp.Vector3(rightAxisX, rightAxisY, 0))) * ((angle * 180 / Math.PI) / 180);
                            offmax = ClampValue(offmax, 0.000001, 0.25);
                            trueOffset.x *= offmax;
                            trueOffset.y *= offmax;
                            trueOffset.z *= offmax;
                            editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                            editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                        }
					}
					else if(editorYMovActive)
					{
                        let objp = editorFocusObject.getOffsetFromInWorldCoords(3, 0, 0);
                        let objr = mp.game.graphics.world3dToScreen2d(objp.x, objp.y, objp.z);
                        let curPos = editorFocusObject.getCoords(true);
                        let objr2 = mp.game.graphics.world3dToScreen2d(curPos.x, curPos.y, curPos.z);
                        let objrf = new mp.Vector3(objr.x - objr2.x, objr.y - objr2.y, 0);
                        let mousepos = new mp.Vector3(objr2.x + rightAxisX, objr2.y + rightAxisY, 0);
                        let objrm = new mp.Vector3(mousepos.x - objr2.x, mousepos.y - objr2.y, 0);
                        let angle = GetAngleBetweenTwoVectors(objrf, objrm);
                        if(angle != NaN && !isNaN(angle) && (angle * 180 / Math.PI) <= 80)
                        {
                            let offsetX = editorFocusObject.getOffsetFromInWorldCoords(3, 0, 0);
                            let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                            let offmax = (GetVectorLength(new mp.Vector3(rightAxisX, rightAxisY, 0))) * ((100 - (angle * 180 / Math.PI)) / 100);
                            offmax = ClampValue(offmax, 0.000001, 0.25);
                            trueOffset.x *= -offmax;
                            trueOffset.y *= -offmax;
                            trueOffset.z *= -offmax;
                            editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
						    editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                        }
                        else if(angle != NaN && !isNaN(angle) && (angle * 180 / Math.PI) >= 110)
                        {
                            let offsetX = editorFocusObject.getOffsetFromInWorldCoords(3, 0, 0);
                            let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                            let offmax = (GetVectorLength(new mp.Vector3(rightAxisX, rightAxisY, 0))) * ((angle * 180 / Math.PI) / 180);
                            offmax = ClampValue(offmax, 0.000001, 0.25);
                            trueOffset.x *= offmax;
                            trueOffset.y *= offmax;
                            trueOffset.z *= offmax;
                            editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                            editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                        }
					}
					else if(editorZMovActive)
					{
						let objp = editorFocusObject.getOffsetFromInWorldCoords(0, 3, 0);
                        let objr = mp.game.graphics.world3dToScreen2d(objp.x, objp.y, objp.z);
                        let curPos = editorFocusObject.getCoords(true);
                        let objr2 = mp.game.graphics.world3dToScreen2d(curPos.x, curPos.y, curPos.z);
                        let objrf = new mp.Vector3(objr.x - objr2.x, objr.y - objr2.y, 0);
                        let mousepos = new mp.Vector3(objr2.x + rightAxisX, objr2.y + rightAxisY, 0);
                        let objrm = new mp.Vector3(mousepos.x - objr2.x, mousepos.y - objr2.y, 0);
                        let angle = GetAngleBetweenTwoVectors(objrf, objrm);
                        if(angle != NaN && !isNaN(angle) && (angle * 180 / Math.PI) <= 80)
                        {
                            let offsetX = editorFocusObject.getOffsetFromInWorldCoords(0, 3, 0);
                            let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                            let offmax = (GetVectorLength(new mp.Vector3(rightAxisX, rightAxisY, 0))) * ((100 - (angle * 180 / Math.PI)) / 100);
                            offmax = ClampValue(offmax, 0.000001, 0.25);
                            trueOffset.x *= -offmax;
                            trueOffset.y *= -offmax;
                            trueOffset.z *= -offmax;
                            editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
						    editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                        }
                        else if(angle != NaN && !isNaN(angle) && (angle * 180 / Math.PI) >= 110)
                        {
                            let offsetX = editorFocusObject.getOffsetFromInWorldCoords(0, 3, 0);
                            let trueOffset = GetNormalizedVector(new mp.Vector3(curPos.x - offsetX.x, curPos.y - offsetX.y, curPos.z - offsetX.z));
                            let offmax = (GetVectorLength(new mp.Vector3(rightAxisX, rightAxisY, 0))) * ((angle * 180 / Math.PI) / 180);
                            offmax = ClampValue(offmax, 0.000001, 0.25);
                            trueOffset.x *= offmax;
                            trueOffset.y *= offmax;
                            trueOffset.z *= offmax;
                            editorFocusObject.setCoordsNoOffset(curPos.x + trueOffset.x, curPos.y + trueOffset.y, curPos.z + trueOffset.z, false, false, false);
                            editorAxisMemoryPosition = editorFocusObject.getCoords(true);
                        }
                    }
                    else
                    {
                        DestroyAxisMarkerObjs();
                        DestroyMovMarkerObjs();
                        if(ObjectNotNull(editorFocusObject))
                        {
                            if(!IsObjectSpawned(editorFocusObject))
                            {
                                DestroyFocusObject();
                            }
                            else
                            {
                                mp.game.invoke(Natives.RESET_ENTITY_ALPHA, editorFocusObject.handle);
                                editorFocusObject.freezePosition(true);
                                editorFocusObject.setCollision(true, false);
                                editorFocusObject = null;
                            }
                        }
                        editorDragMode = false;
                        editorState = 0;
                        return;
                    }
				}
            }
        }

        //Needs cleanup
        if(ObjectNotNull(editorXMovMarkerObj) && ObjectNotNull(editorYMovMarkerObj) && ObjectNotNull(editorZMovMarkerObj))
        {
            let dist = GetDistanceBetweenTwoVectors(editorFocusObject.getCoords(true), editorCamera.getCoord());
            let res = mp.game.graphics.getScreenResolution(0, 0);
            let yy = res.y;
            let xx = res.x;

            yy /= xx;
            xx = 1;

            xx /= 35 * (dist / 12);
            yy /= 10 * (dist / 12);
            
            let cordPos1 = editorXMovMarkerObj.getCoords(true);
            let cordPos2 = editorYMovMarkerObj.getCoords(true);
            let cordPos3 = editorZMovMarkerObj.getCoords(true);
            let axis1 = mp.game.graphics.world3dToScreen2d(cordPos1.x, cordPos1.y, cordPos1.z);
            let axis2 = mp.game.graphics.world3dToScreen2d(cordPos2.x, cordPos2.y, cordPos2.z);
            let axis3 = mp.game.graphics.world3dToScreen2d(cordPos3.x, cordPos3.y, cordPos3.z);

            if(axis1 != null)
                mp.game.graphics.drawRect(axis1.x, axis1.y, xx, yy * (xx / (xx - yy)), editorXMovColor[0], editorXMovColor[1], editorXMovColor[2], 255);
            if(axis2 != null)
                mp.game.graphics.drawRect(axis2.x, axis2.y, xx, yy * (xx / (xx - yy)), editorYMovColor[0], editorYMovColor[1], editorYMovColor[2], 255);
            if(axis3 != null)
                mp.game.graphics.drawRect(axis3.x, axis3.y, xx, yy * (xx / (xx - yy)), editorZMovColor[0], editorZMovColor[1], editorZMovColor[2], 255);
        }

        if(ObjectNotNull(editorFocusObject))
        {
            let offsetMain = editorFocusObject.getCoords(true);
            let offsetX = editorFocusObject.getOffsetFromInWorldCoords(0, 0, 3);
            let offsetY = editorFocusObject.getOffsetFromInWorldCoords(3, 0, 1);
            let offsetZ = editorFocusObject.getOffsetFromInWorldCoords(0, 3, 1);
            mp.game.graphics.drawMarker(27, offsetMain.x, offsetMain.y, offsetMain.z + 0.05,
                0, 0, 0, 0, 0, 0, editorAxisWidth, editorAxisWidth, editorAxisWidth,
                editorXAxisColor[0], editorXAxisColor[1], editorXAxisColor[2], editorXAxisColor[3],
                false, false, 0, true, "", "", false);
                                
            mp.game.graphics.drawMarker(27, offsetMain.x, offsetMain.y, offsetMain.z,
                0, 0, 0, 90, 90 + AxisMem, 0, editorAxisWidth, editorAxisWidth, editorAxisWidth,
                editorZAxisColor[0], editorZAxisColor[1], editorZAxisColor[2], editorZAxisColor[3],
                false, false, 0, false, "", "", false);
                                
            mp.game.graphics.drawMarker(27, offsetMain.x, offsetMain.y, offsetMain.z,
                0, 0, 0, 90, 180 + AxisMem, 0, editorAxisWidth, editorAxisWidth, editorAxisWidth,
                editorYAxisColor[0], editorYAxisColor[1], editorYAxisColor[2], editorYAxisColor[3],
                false, false, 0, false, "", "", false);
                                
            mp.game.graphics.drawMarker(28, offsetX.x, offsetX.y, offsetX.z,
                0, 0, 0, 0, 0, 0, editorAxisWidth / 10, editorAxisWidth / 10, editorAxisWidth / 10,
                editorXMovColor[0], editorXMovColor[1], editorXMovColor[2], editorXMovColor[3],
                false, false, 0, false, "", "", false);
                                
            mp.game.graphics.drawMarker(28, offsetY.x, offsetY.y, offsetY.z,
                0, 0, 0, 0, 0, 0, editorAxisWidth / 10, editorAxisWidth / 10, editorAxisWidth / 10,
                editorYMovColor[0], editorYMovColor[1], editorYMovColor[2], editorYMovColor[3],
                false, false, 0, false, "", "", false);
                
            mp.game.graphics.drawMarker(28, offsetZ.x, offsetZ.y, offsetZ.z,
                0, 0, 0, 0, 0, 0, editorAxisWidth / 10, editorAxisWidth / 10, editorAxisWidth / 10,
                editorZMovColor[0], editorZMovColor[1], editorZMovColor[2], editorZMovColor[3],
                false, false, 0, false, "", "", false);

            if(ObjectNotNull(editorXAxisMarkerObj) && ObjectNotNull(editorYAxisMarkerObj) && ObjectNotNull(editorZAxisMarkerObj))
            {
                editorXAxisMarkerObj.setRotation(0, 0, AxisMem, 2, true);
                editorYAxisMarkerObj.setRotation(90, 0, AxisMem, 2, true);
                editorZAxisMarkerObj.setRotation(0, 90, AxisMem, 2, true);
                editorXAxisMarkerObj.setCoordsNoOffset(offsetMain.x, offsetMain.y, offsetMain.z, false, false, false);
                editorYAxisMarkerObj.setCoordsNoOffset(offsetMain.x, offsetMain.y, offsetMain.z, false, false, false);
                editorZAxisMarkerObj.setCoordsNoOffset(offsetMain.x, offsetMain.y, offsetMain.z, false, false, false);
            }
    
            if(ObjectNotNull(editorXMovMarkerObj) && ObjectNotNull(editorYMovMarkerObj) && ObjectNotNull(editorZMovMarkerObj))
            {
                editorXMovMarkerObj.setCoordsNoOffset(offsetX.x, offsetX.y, offsetX.z, false, false, false);
                editorYMovMarkerObj.setCoordsNoOffset(offsetY.x, offsetY.y, offsetY.z, false, false, false);
                editorZMovMarkerObj.setCoordsNoOffset(offsetZ.x, offsetZ.y, offsetZ.z, false, false, false);
            }
        }
    }


    if(!editorDragMode)
	{
        let mult = 1;
        let mult2 = 1;

        if(shiftModifier)
        {
            mult = 3;
        }
        else if(controlModifier)
        {
            mult2 = 0.5;
        }

		let rightAxisX = mp.game.controls.getDisabledControlNormal(0, 220);
		let rightAxisY = mp.game.controls.getDisabledControlNormal(0, 221);
		
		let leftAxisX = mp.game.controls.getDisabledControlNormal(0, 218);
		let leftAxisY = mp.game.controls.getDisabledControlNormal(0, 219);
		
        let pos = editorCamera.getCoord();
        let rr = editorCamera.getDirection();
		let vector = new mp.Vector3(0, 0, 0);
		vector.x = rr.x * leftAxisY * mult * mult2;
		vector.y = rr.y * leftAxisY * mult * mult2;
        vector.z = rr.z * leftAxisY * mult * mult2;
		
		let upVector = new mp.Vector3(0, 0, 1);
		let rightVector = GetCrossProduct(GetNormalizedVector(rr), GetNormalizedVector(upVector));
		rightVector.x *= leftAxisX * 0.5;
		rightVector.y *= leftAxisX * 0.5;
		rightVector.z *= leftAxisX * 0.5;
		
		let upMovement = 0.0;
		if(mp.keys.isDown(69) && !chat)
			upMovement = 0.5;
		let downMovement = 0.0;
		if(mp.keys.isDown(81) && !chat)
			downMovement = 0.5;
		
		mp.players.local.position = new mp.Vector3(pos.x + vector.x + 1, pos.y + vector.y + 1, pos.z + vector.z + 1);
		mp.players.local.heading = rr.z;
        editorCamera.setCoord(pos.x - vector.x + rightVector.x, pos.y - vector.y + rightVector.y, pos.z - vector.z + rightVector.z + upMovement - downMovement);
        editorCamera.setRot(rot.x + rightAxisY * -5.0, 0.0, rot.z + rightAxisX * -5.0, 2);
	}
});