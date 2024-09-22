
import newTestament from "./new/all_new";
import oldTestament from "./old/all_old";


const general_knowledge= [
    { name: "New & Old Testament", content: [...newTestament, ...oldTestament] },
    { name: "New Testament", content: newTestament },
    { name: "Old Testament", content: oldTestament },
  ];
  
  export default general_knowledge;