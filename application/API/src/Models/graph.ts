export default class Graph {

    private nodes:any;
    private adjacencyList:any;

    constructor() {
      this.nodes = [];
      this.adjacencyList = {};
    }

    addNode(node:any) {
        this.nodes.push(node); 
        this.adjacencyList[node] = [];
      }

    addEdge(node1:any, node2:any, weight:any) {
        this.adjacencyList[node1].push({node:node2, weight: weight});
        this.adjacencyList[node2].push({node:node1, weight: weight});
    }

    findPathWithDijkstra(startNode:any, endNode:any) {
        let times: any = {};
        let backtrace: any  = {};
        let pq = new PriorityQueue();
        times[startNode] = 0;
      
        this.nodes.forEach((node: any) => {
          if (node !== startNode) {
            times[node] = Infinity
          }
        });
        pq.enqueue([startNode, 0]);
        while (!pq.isEmpty()) {
            let shortestStep = pq.dequeue();
            let currentNode = shortestStep[0];
            this.adjacencyList[currentNode].forEach((neighbor: any) => {
              let time = times[currentNode] + neighbor.weight;
              if (time < times[neighbor.node]) {
                times[neighbor.node] = time;
                backtrace[neighbor.node] = currentNode;
                pq.enqueue([neighbor.node, time]);
              }
            });
          }
          let path = [endNode];
  let lastStep = endNode;
  let counter = 0;
  while(lastStep !== startNode) {
    path.unshift(backtrace[lastStep])
    lastStep = backtrace[lastStep]
    counter = counter + 1
    if(counter > 20)
      return {path: null}
    // console.log("path", path)
  }

  return {path, cost: times[endNode]}
}

}


export class PriorityQueue {

    public collection:any;
    constructor() {
      this.collection = [];
    }

    enqueue(element:any){
        if (this.isEmpty()){ 
          this.collection.push(element);
        } else {
          let added = false;
          for (let i = 1; i <= this.collection.length; i++){
            if (element[1] < this.collection[i-1][1]){ 
              this.collection.splice(i-1, 0, element);
              added = true;
              break;
            }
          }
          if (!added){
              this.collection.push(element);
          }
        }
      };
      
      dequeue() {
        let value = this.collection.shift();
        return value;
      };
      isEmpty() {
        return (this.collection.length === 0) 
      };
}
