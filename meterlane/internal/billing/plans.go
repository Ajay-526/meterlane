package billing

import "fmt"

const (
	PlanAlpha   = "alpha"
	PlanStarter = "starter"
	PlanGrowth  = "growth"
	PlanScale   = "scale"
)

type Plan struct {
	ID             string
	PriceUSD       int
	EventsPerMonth int64
	Metrics        int
	Workspaces     int
}

var Catalog = []Plan{
	{ID: PlanStarter, PriceUSD: 29, EventsPerMonth: 500_000, Metrics: 3, Workspaces: 1},
	{ID: PlanGrowth, PriceUSD: 49, EventsPerMonth: 2_000_000, Metrics: 10, Workspaces: 2},
	{ID: PlanScale, PriceUSD: 79, EventsPerMonth: 10_000_000, Metrics: 0, Workspaces: 5},
}

func Lookup(id string) (Plan, error) {
	switch id {
	case "", PlanAlpha:
		p := Catalog[0]
		p.ID = PlanAlpha
		p.PriceUSD = 0
		return p, nil
	case "dev":
		return Plan{ID: "dev", PriceUSD: 0, EventsPerMonth: 2, Metrics: 3, Workspaces: 1}, nil
	case PlanStarter, PlanGrowth, PlanScale:
		for _, p := range Catalog {
			if p.ID == id {
				return p, nil
			}
		}
	}
	return Plan{}, fmt.Errorf("unknown plan %q", id)
}

func Parse(id string) string {
	if id == "" {
		return PlanStarter
	}
	if _, err := Lookup(id); err != nil {
		return PlanStarter
	}
	return id
}

func PriceCents(id string) (int, error) {
	p, err := Lookup(id)
	if err != nil {
		return 0, err
	}
	if p.PriceUSD <= 0 {
		return 0, fmt.Errorf("plan %s is not payable", id)
	}
	return p.PriceUSD * 100, nil
}
