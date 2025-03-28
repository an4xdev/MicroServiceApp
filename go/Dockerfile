FROM golang:1.23.4 AS build

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o api .

FROM debian:bullseye-slim

WORKDIR /app

COPY --from=build /app/api /app/

EXPOSE 8080

CMD ["/app/api"]
