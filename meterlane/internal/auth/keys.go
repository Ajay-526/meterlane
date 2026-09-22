package auth

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"strings"

	"github.com/meterlane/meterlane/internal/domain"
)

func NewKey(ws domain.WorkspaceID, live domain.Livemode) (plain string, row domain.APIKey, err error) {
	buf := make([]byte, 24)
	if _, err = rand.Read(buf); err != nil {
		return "", row, err
	}
	secret := hex.EncodeToString(buf)
	mode := "test"
	if live {
		mode = "live"
	}
	plain = fmt.Sprintf("ml_%s_%s", mode, secret)
	row = domain.APIKey{
		WorkspaceID: ws,
		Prefix:      plain[:min(12, len(plain))],
		Hash:        Hash(plain),
		Livemode:    live,
	}
	return plain, row, nil
}

func Hash(plain string) string {
	sum := sha256.Sum256([]byte(plain))
	return hex.EncodeToString(sum[:])
}

func ParseBearer(h string) (string, error) {
	h = strings.TrimSpace(h)
	if h == "" {
		return "", fmt.Errorf("missing Authorization")
	}
	const p = "Bearer "
	if !strings.HasPrefix(h, p) {
		return "", fmt.Errorf("Authorization must be Bearer")
	}
	key := strings.TrimSpace(strings.TrimPrefix(h, p))
	if !strings.HasPrefix(key, "ml_test_") && !strings.HasPrefix(key, "ml_live_") {
		return "", fmt.Errorf("key must start with ml_test_ or ml_live_")
	}
	return key, nil
}

func LivemodeOf(plain string) domain.Livemode {
	return domain.Livemode(strings.HasPrefix(plain, "ml_live_"))
}
