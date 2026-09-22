FROM golang:1.22-alpine AS build
WORKDIR /src
COPY go.mod go.sum ./
COPY . .
RUN CGO_ENABLED=0 go test ./...
RUN CGO_ENABLED=0 go build -o /out/meterlane ./cmd/meterlane

FROM gcr.io/distroless/static-debian12
COPY --from=build /out/meterlane /meterlane
COPY migrations /migrations
ENV METERLANE_LISTEN=:8080
ENV MIGRATIONS_DIR=/migrations
EXPOSE 8080
ENTRYPOINT ["/meterlane"]
CMD ["-mode=all"]
