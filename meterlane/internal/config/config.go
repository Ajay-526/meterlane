package config

import (
	"os"
	"time"
)

type Config struct {
	Listen       string
	DatabaseURL  string
	DataFile     string
	Adapter      string
	FlushEvery   time.Duration
	Window       time.Duration
	DevWorkspace string
	DevKey       string
	AlphaToken   string
}

func FromEnv() Config {
	return Config{
		Listen:       getenv("METERLANE_LISTEN", ":8080"),
		DatabaseURL:  os.Getenv("DATABASE_URL"),
		DataFile:     getenv("METERLANE_DATA", "data/meterlane.json"),
		Adapter:      getenv("STRIPE_ADAPTER", "fake"),
		FlushEvery:   parseDur(getenv("FLUSH_EVERY", "30s"), 30*time.Second),
		Window:       parseDur(getenv("ROLLUP_WINDOW", "1m"), time.Minute),
		DevWorkspace: getenv("DEV_WORKSPACE", "ws_dev"),
		DevKey:       os.Getenv("DEV_API_KEY"),
		AlphaToken:   getenv("ALPHA_TOKEN", "change-me"),
	}
}

func getenv(k, def string) string {
	if v := os.Getenv(k); v != "" {
		return v
	}
	return def
}

func parseDur(s string, def time.Duration) time.Duration {
	d, err := time.ParseDuration(s)
	if err != nil {
		return def
	}
	return d
}
