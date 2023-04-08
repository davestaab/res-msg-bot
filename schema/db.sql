CREATE TABLE IF NOT EXISTS current_test_status (
  id serial PRIMARY KEY,
  branch varchar(255) NOT NULL,
  who varchar(50) NOT NULL,
  what varchar(50) NOT NULL,
  last_attempt timestamptz NOT NULL,
  counter integer NOT NULL,
  build_id varchar(50) NOT NULL,
  created timestamptz NOT NULL DEFAULT now()
);
