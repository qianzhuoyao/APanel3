import { Observable } from "rxjs";

/**
 * 
 * @example
 * 
// 使用示例
const targetNode = document.getElementById("target"); // 替换为你要观察的DOM节点
const options: MutationObserverInit = {
  childList: true,
  attributes: true,
  subtree: true,
};

if (targetNode) {
  const mutationObservable = createMutationObserver(targetNode, options);

  // 订阅观察到的变动
  mutationObservable.subscribe({
    next: (mutations) => {
      mutations.forEach((mutation) => {
        console.log("Mutation detected:", mutation);
      });
    },
    error: (err) => console.error(err),
    complete: () => console.log("Observation complete"),
  });
}

 *
 * @return  {[type]}  [return description]
 */
export function createMutationObserver(
  targetNode: Node,
  options: MutationObserverInit
): Observable<MutationRecord[]> {
  return new Observable<MutationRecord[]>((observer) => {
    const mutationObserver = new MutationObserver(
      (mutations: MutationRecord[]) => {
        observer.next(mutations);
      }
    );

    // 开始观察指定的DOM节点
    mutationObserver.observe(targetNode, options);

    // 当Observable完成或取消订阅时，停止观察
    return () => mutationObserver.disconnect();
  });
}
