const router = require("express").Router();
import {Request, Response} from "express";
import Sapce from "../Models/SpaceModel";

const space = Sapce.getInstance();

// Get the entire universe mapping
router.route("/").get( (req : Request , res : Response) => {
    return res.send(space.getData());
});

// Get the entire universe mapping
router.route("/upload").post( (req : Request , res : Response) => {
    interface Link {
        to : String;
        cost: Number;
    }
    
    interface SpaceDoor {
        name : String;
        links: Array<Link>;
    }
    var data : Array<SpaceDoor> = req.body.spaceData
    // console.log(data)
    // space.upload(data)
    return res.send(space.upload(data));
});

// for a given start Space Door and a given amount of Camemberts, list all the accessible Space Doors
router.route("/").post( (req : Request<{},{},{cost: Number, doorName: String},{}>, res : Response) => {
    
    var spaceDoorName : String = req.body.doorName;
    var spaceDoorCost : Number = req.body.cost;

    var spaceDoor = space.find(spaceDoorName);
    
    if(spaceDoor == undefined)
        return res.send("The Space Door Name is Not Found");

    var distinationSpaceDoors = space.distinationFinder(spaceDoor, spaceDoorCost);

    if(distinationSpaceDoors == undefined || distinationSpaceDoors.length == 0)
        return res.send("There is no Distination with this Cost");

    return res.send(distinationSpaceDoors);
});

// for a given start Space Door and a given end Space Door, get the path between those 2 locations that is the cheapest in Camemberts
router.route("/path").post((req : Request<{},{},{first: String, second: String},{}>, res : Response) => {
    var first : String = req.body.first;
    var second : String = req.body.second;

    // console.log(space.findCheapestCamemberts(first, second));
    return res.status(200).send(space.findCheapestCamemberts(first, second));

})

module.exports = router;