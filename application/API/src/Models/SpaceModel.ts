import Graph from "./graph";

interface Link {
    to : String;
    cost: Number;
}

interface SpaceDoor {
    name : String;
    links: Array<Link>;
}

export default class Space {

    private static instance: Space;
    private spaceTimeContinuum : Array<SpaceDoor> = this.defaultData();
    public map : Graph = new Graph;

    private constructor() {
      this.updateMap()
    }

    private updateMap(): void{
      this.map= new Graph;
      this.spaceTimeContinuum.map((door: SpaceDoor)=>{
        this.map.addNode(door.name);
      })
      this.spaceTimeContinuum.map((door: SpaceDoor)=>{
        door.links.map((link: Link)=>{
          this.map.addEdge(door.name, link.to, link.cost);
        })
      })
    }

    public static getInstance(): Space {
        if (!Space.instance) {
            Space.instance = new Space();
        }

        return Space.instance;
    }

    public upload(list : Array<SpaceDoor>) : String{
        this.spaceTimeContinuum = list;
        try{
          this.updateMap();
          return "Data Updated";
        }
        catch{
          return "Data Update Failled";
        }
    }

    public getData(): Array<SpaceDoor>{
        return this.spaceTimeContinuum;
    }

    public find(spaceDoorName: String) : (SpaceDoor | undefined) {
        var spaceDoor = this.spaceTimeContinuum.find( (door: SpaceDoor) => door.name == spaceDoorName);
        return spaceDoor;
    }

    public distinationFinder(door: SpaceDoor, cost: Number) : (Array<Link> | undefined){
        return door.links.filter( (link: Link) => link.cost <= cost);
    }

    public findCheapestCamemberts(start: String, end: String){
      return this.map.findPathWithDijkstra(start, end)
    }

    public defaultData(): Array<SpaceDoor> {
        return [
    {
      "name": "Astra",
      "links": [
        {
          "to": "Luka",
          "cost": 2
        },
        {
          "to": "Nemo",
          "cost": 1
        },
        {
          "to": "Galaad",
          "cost": 4
        }
      ]
    },
    {
      "name": "Luka",
      "links": [
        {
          "to": "Astra",
          "cost": 2
        }
      ]
    },
    {
      "name": "Nemo",
      "links": [
        {
          "to": "Astra",
          "cost": 1
        },
        {
          "to": "Galaad",
          "cost": 1
        }
      ]
    },
    {
      "name": "Galaad",
      "links": [
        {
          "to": "Astra",
          "cost": 4
        },
        {
          "to": "Nemo",
          "cost": 1
        }
      ]
    },
    {
      "name": "Amazing-Les-Bains",
      "links": [
        {
          "to": "Ootal",
          "cost": 2
        }
      ]
    },
    {
      "name": "Ootal",
      "links": [
        {
          "to": "Amazing-Les-Bains",
          "cost": 2
        }
      ]
    }
  ]
    }
}
