//store.js
export default {
    state:{
        name:"12345"
    },
    setStateMessage(name){
		if(name !== undefined){
        this.state.name = name;
        }
	}
}