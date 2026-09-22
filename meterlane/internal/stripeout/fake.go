package stripeout

import (
	"context"
	"fmt"
	"sync"
)

type Fake struct {
	mu      sync.Mutex
	Items   []InvoiceItem
	FailFor map[string]error
	Seen    map[string]bool
}

func NewFake() *Fake {
	return &Fake{
		FailFor: map[string]error{},
		Seen:    map[string]bool{},
	}
}

func (f *Fake) CreateInvoiceItem(_ context.Context, item InvoiceItem) (Result, error) {
	f.mu.Lock()
	defer f.mu.Unlock()
	if err, ok := f.FailFor[item.IdempotencyKey]; ok {
		return Result{}, err
	}
	if f.Seen[item.IdempotencyKey] {
		return Result{ID: "ii_dup_" + item.IdempotencyKey, Duplicate: true}, nil
	}
	f.Seen[item.IdempotencyKey] = true
	f.Items = append(f.Items, item)
	id := fmt.Sprintf("ii_fake_%d", len(f.Items))
	return Result{ID: id}, nil
}

func (f *Fake) Count() int {
	f.mu.Lock()
	defer f.mu.Unlock()
	return len(f.Items)
}
