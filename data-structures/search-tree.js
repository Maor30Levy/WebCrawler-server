const Queue = require("./queue");
const Node = require("./node");
const binarySearch = require("../utils/array-search");
const markersHandler = require("../utils/markers-handler");



class SearchTree{
    constructor(){
        this.root = null;
        this.level = 0;
        this.requestLevel = 0;
        this.pages = 0;
        this.requestPages = 0;
    }

    setNodeByID(id,newNode) { 
        if(id.length===1) return this.root=newNode;
        let node = this.root;
        let workID = id;
        for(let i= 0;i<workID.length-1;i++){
            let footer;
            if(workID[i+1]==='/'){
                const result = markersHandler(workID.slice(i+1));
                workID = workID.slice(0,i+1)+result.id;
                footer = result.num;
            }else footer = workID[i+1];
            if(i+1===workID.length-1) node.children[footer] = newNode;
            else node = node.children[footer]; 
        }
        return newNode;
    }

    getNodeByID(id) {
        if(this.root===null) return;
        let node = this.root;
        if(node.children.length===0) return node;
        let workID = id;
        for(let i= 0;i<workID.length-1;i++){
            let footer;
            if(workID[i+1]==='/'){
                const result = markersHandler(workID.slice(i+1));
                workID = workID.slice(0,i+1)+result.id;
                footer = result.num;
            }else footer = workID[i+1];
            node = node.children[footer];
        }
        return node;
    }
    
    setChildrenNodes(childrenURLsArray,level,parentID){
        const nodesArray = [];
        for(let i=0;i<childrenURLsArray.length;i++){
            const footer = i>9?`/${i}/`:i;
            nodesArray.push(new Node(childrenURLsArray[i],level,parentID+footer));
        }
        return nodesArray;
    }

    getChildrenURLs(node){
        const urlArray = [];
        node.children.forEach((child)=>{urlArray.push(child.url)});
        return urlArray;
    }
    
}

module.exports = SearchTree;