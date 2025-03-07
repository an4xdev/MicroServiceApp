FROM golang:1.23.4 AS build
WORKDIR /app
EXPOSE 8080
COPY . .
RUN go build .
CMD ["./api"]