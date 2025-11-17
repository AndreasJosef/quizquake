// a small and barebones pubsub implementation.
function createEventBus(){

    // map for easy set and get
    let subs = new Map();

    function on(event, callback){

        let callbacks = subs.get(event) || []

        callbacks.push(callback);
        subs.set(event, callbacks);
    }

    function emit(event, payload){
        let callbacks = subs.get(event) || []

        callbacks.forEach(cb => {
            cb(payload)
        })
    }

    return { on, emit } 
}

// export a singleton for use accross the app
export const bus = createEventBus();