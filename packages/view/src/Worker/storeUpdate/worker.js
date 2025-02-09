const mutations = {
  updateNodes: (state, payload) => ({
    ...state,
    nodes: payload,
  }),
  setSelected: (state, payload) => ({
    ...state,
    selected: payload,
  }),
};

self.onmessage = function (event) {
  const { type,model, tasks } = event.data;
  console.log(event, "event");
  if (type === "batchCommit") {
    const results = tasks.map((task) => {
      try {
        const mutation = task.mutationName;
        const payload = task.payload;
        const modelState = task.prevState;
        const newState = mutations[mutation](modelState, payload);
        return { model: task.model, newState };
      } catch (error) {
        console.error("Worker Error:", error);
        return { model: task.model, newState: task.prevState };
      }
    });

    self.postMessage({ results,model });
  }
};
