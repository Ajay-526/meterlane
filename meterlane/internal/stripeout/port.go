package stripeout

import (
	"context"

	"github.com/meterlane/meterlane/internal/domain"
)

type InvoiceItem struct {
	AccountID        string
	AccessToken      string
	Livemode         domain.Livemode
	StripeCustomerID string
	AmountMinor      int64
	Currency         string
	Description      string
	IdempotencyKey   string
}

type Result struct {
	ID        string
	Duplicate bool
}

type Client interface {
	CreateInvoiceItem(ctx context.Context, item InvoiceItem) (Result, error)
}
