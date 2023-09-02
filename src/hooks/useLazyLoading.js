import { createRef, useEffect, useRef, useState } from "react";

export const useLazyLoading = (data, lastElement, portion = 1) => {
    const [items, setItems] = useState([]);
    const [visibleCount, setVisibleCount] = useState(0);
    const nodeRefs = useRef({});
    const observer = useRef();

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        var callback = function (entries) {
            if (entries[0].isIntersecting && visibleCount < data.length) {
                const result = data.slice(0, visibleCount + portion).map(el => {
                    let nodeRef;
                    if (el.id in nodeRefs.current) {
                        nodeRef = nodeRefs.current[el.id];
                    }
                    else {
                        nodeRef = createRef(null);
                        nodeRefs.current[el.id] = nodeRef;
                    }
                    return { ...el, nodeRef }
                });
                setItems(result);
                setVisibleCount(result.length);
            }
            else if (items.length !== visibleCount) {
                const result = data.slice(0, visibleCount).map(el => {
                    let nodeRef;
                    if (el.id in nodeRefs.current) {
                        nodeRef = nodeRefs.current[el.id];
                    }
                    else {
                        nodeRef = createRef(null);
                        nodeRefs.current[el.id] = nodeRef;
                    }
                    return { ...el, nodeRef }
                });
                setItems(result);
            }
        }
        if (lastElement.current) {
            observer.current = new IntersectionObserver(callback);
            observer.current.observe(lastElement.current);
        }

    }, [visibleCount, data, items]);

    return { items, setItems, setVisibleCount }
}