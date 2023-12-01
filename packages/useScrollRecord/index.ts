import { ref } from "vue";
import { throttle } from "lodash-es";

export type ScrollPosition = {
    x: number;
    y: number;
}

export function useScrollRecord() {
    const position = ref<ScrollPosition>({x: 0, y: 0})
    const scrollContent = ref<HTMLElement | null>(null);

    function registerScroll():()=> void {
        if(scrollContent.value) {
            const el: HTMLElement = scrollContent.value;
            const handleScroll = throttle(():void=> {
                position.value.x = el.scrollLeft;
                position.value.y = el.scrollTop;
            }, 100, { trailing: true });
            scrollContent.value.addEventListener('scroll',handleScroll);
            return ():void => removeEventListener('scroll',handleScroll);
        }
        return ():void=> {};
    }

    function rollbackScroll(recordPosition: ScrollPosition) {
        if(!scrollContent.value) return;
        if(Object.prototype.hasOwnProperty.call(recordPosition, 'x')) {
            scrollContent.value.scrollLeft = recordPosition.x;
        }
        if(Object.prototype.hasOwnProperty.call(recordPosition, 'y')) {
            scrollContent.value.scrollTop = recordPosition.y;
        }
    }

    return {
        registerScroll,
        rollbackScroll,
        scrollContent
    }
}
