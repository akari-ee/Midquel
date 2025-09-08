import { useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

/**
 * Archives 섹션이 뷰포트 중앙을 지나치면 true, 위로 벗어나면 false를 반환
 * @param sectionId 감시할 섹션의 element id (기본값: 'archives-section')
 * @param offset 트리거 미세 조정(px). 양수면 더 늦게, 음수면 더 일찍 토글
 */
export function useNavbarBgOnSection({
  sectionId = "archives-section",
  offset = 0,
}: {
  sectionId: string;
  offset: number;
}) {
  const [hasBg, setHasBg] = useState(false);
  const [triggerY, setTriggerY] = useState<number | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const computeTrigger = () => {
      const el = document.getElementById(sectionId);
      if (!el) {
        setTriggerY(null);
        return;
      }
      const rect = el.getBoundingClientRect();
      const elTop = rect.top + window.scrollY;
      const viewportCenter = window.innerHeight / 2;
      setTriggerY(elTop - viewportCenter + offset);
    };

    computeTrigger();
    window.addEventListener("resize", computeTrigger);
    return () => window.removeEventListener("resize", computeTrigger);
  }, [sectionId, offset]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (triggerY == null) return;
    setHasBg(latest >= triggerY);
  });

  return hasBg;
}
