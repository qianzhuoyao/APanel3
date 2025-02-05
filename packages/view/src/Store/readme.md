```ts
  useEffect(() => {
    console.log("w1dddddd");
    // getRenderStore().store.openTransaction();
    getRenderStore().store.commit("nodes", "updateNodes", [], 1);
    const timer1 = setTimeout(() => {
      console.log("w1dddddd");
      getRenderStore().store.commit("nodes", "updateNodes", [1], 1);
    }, 1000);

    const timer = setTimeout(() => {
      getRenderStore().store.undo();
      getRenderStore().store.redo();
    }, 3000);

    getRenderStore().store.subscribe((a) => {
      console.log(a, getRenderStore().store.history, "a0a");
    });

    return () => {
      clearTimeout(timer);
      clearTimeout(timer1);

      getRenderStore().store.unSubscribe();
    };
  }, []);
```
