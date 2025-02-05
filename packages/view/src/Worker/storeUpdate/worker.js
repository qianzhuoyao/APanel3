const mutations = {
  updateNodes: (state, payload) => ({
    ...state,
    nodes: payload,
  }),
};

self.onmessage = function (event) {
  const { type, tasks } = event.data;
  console.log(event, "event");
  if (type === "batchCommit") {
    const results = tasks.map((task) => {
      try {
        // 模拟 mutation 执行
        const mutation = task.mutationName;
        const payload = task.payload;
        const modelState = task.prevState;

        const newState = mutations[mutation](modelState, payload); // 执行 mutation
        return { model: task.model, newState };
      } catch (error) {
        console.error("Worker Error:", error);
        return { model: task.model, newState: task.prevState };
      }
    });

    self.postMessage({ results });
  }
};
