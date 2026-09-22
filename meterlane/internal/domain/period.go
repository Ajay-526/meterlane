package domain

import (
	"fmt"
	"time"
)

func PeriodStart(t time.Time) time.Time {
	t = t.UTC()
	return time.Date(t.Year(), t.Month(), 1, 0, 0, 0, 0, time.UTC)
}

func PeriodEnd(start time.Time) time.Time {
	return PeriodStart(start).AddDate(0, 1, 0)
}

func PeriodLabel(start time.Time) string {
	return PeriodStart(start).Format("2006-01")
}

func ParsePeriod(label string) (time.Time, error) {
	t, err := time.ParseInLocation("2006-01", label, time.UTC)
	if err != nil {
		return time.Time{}, fmt.Errorf("period must be YYYY-MM")
	}
	return t, nil
}

func PeriodClosed(start, now time.Time) bool {
	return !now.UTC().Before(PeriodEnd(start))
}

func InvoiceItemKey(ws WorkspaceID, period, alias, metric string) string {
	k := fmt.Sprintf("ml_%s_%s_%s_%s", ws, period, alias, metric)
	if len(k) > 255 {
		return k[:255]
	}
	return k
}
