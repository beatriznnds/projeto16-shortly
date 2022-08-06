--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 14.4 (Ubuntu 14.4-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sessions_id_seq OWNER TO postgres;

--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL,
    views integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.urls OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO postgres;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(60) NOT NULL,
    email character varying(50) NOT NULL,
    password text NOT NULL,
    "createdAt" date DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions (id, token, "userId", "createdAt") FROM stdin;
1	4aac79a7-a014-491b-bdba-866d04161a9f	2	2022-08-02
2	cd2cd36b-1b8f-4272-9710-ae557f78eabd	1	2022-08-02
3	e966c3dd-3818-4f30-8bfb-d6de0fa16762	1	2022-08-02
4	5c2dfab7-8f3f-4cc3-94a7-66ac125d84b4	3	2022-08-03
5	e03c77ea-0d9f-4345-8ce9-389a29ffe8d9	4	2022-08-03
6	fc7b4b13-74b3-421d-a0f9-56ff07e77f2c	5	2022-08-04
7	d00a4a0e-5f7a-4f98-82c9-11cc50aa5eae	5	2022-08-04
8	22df1996-1107-454c-9b0a-9ac92eb16e84	5	2022-08-04
9	221f4c56-e046-471f-b740-c41230ef1f1d	5	2022-08-04
10	d4ec9428-5e73-46ad-a304-74523e54c268	6	2022-08-04
\.


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.urls (id, url, "shortUrl", "userId", "createdAt", views) FROM stdin;
1	https://bootcampra.notion.site/Projeto-Shortly-API-4ffa110c0ebd4e83ad7302cfafd33133	3oJI1ZryAzYgB1WQS-OwX	1	2022-08-02	1
4	https://bootcampra.notion.site/Projeto-Shortly-API-4ffa110c0ebd4e83ad7302cafd33133	pC0KZWNli1_2V0smToE7m	1	2022-08-02	5
5	https://bootcampra.notion.site/Projeto-Shortly-API-4ffa110c0ebd4e83ad7302cafd33133	k8X7pFSmjdpkSo_1Odjsl	1	2022-08-02	3
8	https://s2.glbimg.com/x2Hg7IGKSh_CB0svv726-W-bhic=/0x0:1210x540/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2019/6/q/M5UZDRSfuWAbL8a1j9yA/morgana-splash-art.png	AcdvL10F_WL2gpyrsEQlC	3	2022-08-03	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, "createdAt") FROM stdin;
1	João	joao@driven.com.br	$2b$10$w7SQaueNcQH3zG64GcK.FO3D8EoqQm4rogRq3VuxMbXyFAngoZCOS	2022-08-02
2	Bia	bia@driven.com.br	$2b$10$J4qD9UeIX/b9xgmXGaox6OTRyPSVqP/ey1KoFYyR8sTm1ok8CVRtm	2022-08-02
3	Leminski	leminski@driven.com.br	$2b$10$Y5sVvffMzOC4gpmYfx7INO5zI4oWKcj69em85kmvDgzyjf2eZxC.W	2022-08-03
4	Poe	poe@driven.com.br	$2b$10$gtwmndthiJziUduqDrwnZOoomcmYWg0DUr7.AIYAidEBIC1/itqXS	2022-08-03
5	Karl Marx	marx@driven.com.br	$2b$10$mXHqjyZ7MZBD0TnXFC1iU.MNOS7BIRObxY3igFa/Yv2.pg.3.Dkiu	2022-08-04
6	Picles	picles@driven.com.br	$2b$10$6ARLX3o10cWy2cZIoHh4UOsn3CzRtts.H2ylbChC0zHwHKDEx7wxG	2022-08-04
\.


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sessions_id_seq', 10, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.urls_id_seq', 13, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

