package main

import(
	"fmt"
	"net/http"

	"github.com/TutorialEdge/realtime-chat-go-react/pkg/websocket"
)

// определить конечную точку WebSocket
func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")

	conn, err := websocket.Upgrade(w, r)

	if err != nil {
		fmt.Fprintf(w, "%+V\n", err)
	}
	
	client := &websocket.Client{
	Conn: conn,
	Pool: pool,
	}

	pool.Register <-client
	client.Read()
	// go websocket.Writer(ws)
	// websocket.Reader(ws)
}



func setupRoutes() {
	pool := websocket.NewPool()
	go pool.Start()

	http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})

	
}

func main() {
	fmt.Println("Chat App v0.01")
	setupRoutes()
	http.ListenAndServe(":8080", nil)

}