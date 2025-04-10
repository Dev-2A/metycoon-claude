// src/components/stats/HeatmapChart.jsx
import CalendarHeatmap from "react-calendar-heatmap";
import { subDays, format, parseISO } from "date-fns";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "../../styles/heatmap.css";
import ThemedCard from "../common/ThemedCard";

export default function HeatmapChart({ data }) {
    const endDate = new Date();
    const startDate = subDays(endDate, 180); // 최근 6개월

    const values = data.map(item => ({
        date: parseISO(item.date),
        count: item.count,
    }));

    const getClassForValue = (value) => {
        if (!value || value.count === 0) return 'color-empty';
        if (value.count >= 4) return "color-scale-4";
        if (value.count === 3) return "color-scale-3";
        if (value.count === 2) return "color-scale-2";
        return "color-scale-1";
    };

    const getTooltipDataAttrs = (value) => {
        if (!value || !value.date) return null;
        return {
            "data-tooltip-id": "heatmap-tooltip",
            "data-tooltip-content": `${format(value.date, "yyyy-MM-dd")}: ${value.count} 퀘스트`,
        };
    };

    return (
        <ThemedCard>
            <h2 className="text-lg font-bold mb-2">📅 퀘스트 히트맵</h2>
            <CalendarHeatmap
                startDate={startDate}
                endDate={endDate}
                values={values}
                classForValue={getClassForValue}
                tooltipDataAttrs={getTooltipDataAttrs}
                showWeekdayLabels
            />
            <ReactTooltip id="heatmap-tooltip" />
        </ThemedCard>
    );
}