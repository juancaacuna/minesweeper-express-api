-- Table: public."Users"

CREATE SEQUENCE public."Users_userId_seq"
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE TABLE public."Users"
(
  "userId" integer NOT NULL DEFAULT nextval('"Users_userId_seq"'::regclass),
  email text NOT NULL,
  country character varying(3),
  CONSTRAINT "Users_PK" PRIMARY KEY ("userId")
)
WITH (
  OIDS=FALSE
);

-- Table: public."Records"

CREATE SEQUENCE public."Records_recordId_seq"
  INCREMENT 1
  MINVALUE 1
  MAXVALUE 9223372036854775807
  START 1
  CACHE 1;

CREATE TABLE public."Records"
(
  "recordId" integer NOT NULL DEFAULT nextval('"Records_recordId_seq"'::regclass),
  level numeric(2,0) NOT NULL,
  "userId" integer,
  seconds integer NOT NULL DEFAULT 0,
  CONSTRAINT "Records_PK" PRIMARY KEY ("recordId"),
  CONSTRAINT "Records_userId_Users" FOREIGN KEY ("userId")
      REFERENCES public."Users" ("userId") MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);

INSERT INTO public."Records"(level, seconds) VALUES (4, 0);
INSERT INTO public."Records"(level, seconds) VALUES (5, 0);
INSERT INTO public."Records"(level, seconds) VALUES (6, 0);
INSERT INTO public."Records"(level, seconds) VALUES (7, 0);
INSERT INTO public."Records"(level, seconds) VALUES (8, 0);
INSERT INTO public."Records"(level, seconds) VALUES (9, 0);
INSERT INTO public."Records"(level, seconds) VALUES (10, 0);
INSERT INTO public."Records"(level, seconds) VALUES (11, 0);
INSERT INTO public."Records"(level, seconds) VALUES (12, 0);
INSERT INTO public."Records"(level, seconds) VALUES (13, 0);
INSERT INTO public."Records"(level, seconds) VALUES (14, 0);
INSERT INTO public."Records"(level, seconds) VALUES (15, 0);
INSERT INTO public."Records"(level, seconds) VALUES (16, 0);
INSERT INTO public."Records"(level, seconds) VALUES (17, 0);
INSERT INTO public."Records"(level, seconds) VALUES (18, 0);
INSERT INTO public."Records"(level, seconds) VALUES (19, 0);
INSERT INTO public."Records"(level, seconds) VALUES (20, 0);