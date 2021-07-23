--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

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

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: boards; Type: TABLE; Schema: public; Owner: alin
--

CREATE TABLE public.boards (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    user_id integer
);


ALTER TABLE public.boards OWNER TO alin;

--
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: alin
--

CREATE SEQUENCE public.boards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.boards_id_seq OWNER TO alin;

--
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alin
--

ALTER SEQUENCE public.boards_id_seq OWNED BY public.boards.id;


--
-- Name: cards; Type: TABLE; Schema: public; Owner: alin
--

CREATE TABLE public.cards (
    id integer NOT NULL,
    board_id integer NOT NULL,
    status_id integer NOT NULL,
    title character varying(200) NOT NULL,
    card_order integer NOT NULL
);


ALTER TABLE public.cards OWNER TO alin;

--
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: alin
--

CREATE SEQUENCE public.cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cards_id_seq OWNER TO alin;

--
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alin
--

ALTER SEQUENCE public.cards_id_seq OWNED BY public.cards.id;


--
-- Name: statuses; Type: TABLE; Schema: public; Owner: alin
--

CREATE TABLE public.statuses (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    board_id integer NOT NULL
);


ALTER TABLE public.statuses OWNER TO alin;

--
-- Name: statuses_id_seq; Type: SEQUENCE; Schema: public; Owner: alin
--

CREATE SEQUENCE public.statuses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.statuses_id_seq OWNER TO alin;

--
-- Name: statuses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alin
--

ALTER SEQUENCE public.statuses_id_seq OWNED BY public.statuses.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: alin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO alin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: alin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO alin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: alin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: boards id; Type: DEFAULT; Schema: public; Owner: alin
--

ALTER TABLE ONLY public.boards ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);


--
-- Name: cards id; Type: DEFAULT; Schema: public; Owner: alin
--

ALTER TABLE ONLY public.cards ALTER COLUMN id SET DEFAULT nextval('public.cards_id_seq'::regclass);


--
-- Name: statuses id; Type: DEFAULT; Schema: public; Owner: alin
--

ALTER TABLE ONLY public.statuses ALTER COLUMN id SET DEFAULT nextval('public.statuses_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: alin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: alin
--

COPY public.boards (id, title, user_id) FROM stdin;
3	uite	\N
8	codecool	1
\.


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: alin
--

COPY public.cards (id, board_id, status_id, title, card_order) FROM stdin;
13	3	11	codecool	1
\.


--
-- Data for Name: statuses; Type: TABLE DATA; Schema: public; Owner: alin
--

COPY public.statuses (id, title, board_id) FROM stdin;
5	new	3
7	in progress	3
11	testing	3
14	done	3
25	new	8
26	in progress	8
27	testing	8
28	done	8
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: alin
--

COPY public.users (id, name, password) FROM stdin;
1	alin	$2b$12$TryYJBCGSz/nme2.r5kFH.s/fLjsTg5xCUWCbpKD4Me1bxpj2fAJe
2	alin10nastasa@gmail.com	$2b$12$VP9OP5FTNsUrI06/WeB1TO3j6M7y8U2BHlhyWiPChKrNnDwn0tsPm
\.


--
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alin
--

SELECT pg_catalog.setval('public.boards_id_seq', 8, true);


--
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alin
--

SELECT pg_catalog.setval('public.cards_id_seq', 13, true);


--
-- Name: statuses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alin
--

SELECT pg_catalog.setval('public.statuses_id_seq', 28, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: alin
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: boards boards_pkey; Type: CONSTRAINT; Schema: public; Owner: alin
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: alin
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: statuses statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: alin
--

ALTER TABLE ONLY public.statuses
    ADD CONSTRAINT statuses_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: alin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cards fk_cards_board_id; Type: FK CONSTRAINT; Schema: public; Owner: alin
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES public.boards(id);


--
-- PostgreSQL database dump complete
--
