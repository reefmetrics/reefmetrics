package autotester

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/reef-pi/reef-pi/controller/utils"
)

// LoadAPI registers autotester REST endpoints.
func (s *Subsystem) LoadAPI(r *mux.Router) {
	r.HandleFunc("/api/autotester/config", s.getConfig).Methods("GET")
	r.HandleFunc("/api/autotester/config", s.updateConfig).Methods("PUT")
}

func (s *Subsystem) getConfig(w http.ResponseWriter, r *http.Request) {
	fn := func(_ string) (interface{}, error) {
		return s.config, nil
	}
	utils.JSONGetResponse(fn, w, r)
}

func (s *Subsystem) updateConfig(w http.ResponseWriter, r *http.Request) {
	var conf Config
	fn := func(_ string) error {
		return s.saveConfig(conf)
	}
	utils.JSONUpdateResponse(&conf, fn, w, r)
}
