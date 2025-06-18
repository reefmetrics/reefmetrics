package autotester

import (
	"github.com/reef-pi/reef-pi/controller"
	"github.com/reef-pi/reef-pi/controller/storage"
)

const Bucket = storage.AutoTesterBucket
const UsageBucket = storage.AutoTesterUsageBucket

// Config defines basic configuration for the autotester module.
type Config struct {
	Enable bool `json:"enable"`
}

// Subsystem represents the autotester module controller.
type Subsystem struct {
	c      controller.Controller
	config Config
}

func (s *Subsystem) loadConfig() error {
	var conf Config
	if err := s.c.Store().Get(Bucket, "config", &conf); err != nil {
		if err == storage.ErrDoesNotExist {
			conf = Config{}
			if err := s.c.Store().CreateWithID(Bucket, "config", &conf); err != nil {
				return err
			}
		} else {
			return err
		}
	}
	s.config = conf
	return nil
}

func (s *Subsystem) saveConfig(c Config) error {
	s.config = c
	return s.c.Store().Update(Bucket, "config", &s.config)
}

// New creates a new autotester subsystem instance.
func New(c controller.Controller) *Subsystem {
	return &Subsystem{c: c}
}

func (s *Subsystem) Setup() error {
	if err := s.c.Store().CreateBucket(Bucket); err != nil {
		return err
	}
	if err := s.c.Store().CreateBucket(UsageBucket); err != nil {
		return err
	}
	return s.loadConfig()
}

func (s *Subsystem) Start() {}
func (s *Subsystem) Stop()  {}

func (s *Subsystem) On(id string, b bool) error                     { return nil }
func (s *Subsystem) InUse(string, string) ([]string, error)         { return []string{}, nil }
func (s *Subsystem) GetEntity(id string) (controller.Entity, error) { return nil, nil }
