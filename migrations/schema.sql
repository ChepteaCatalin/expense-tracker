--
-- PostgreSQL database dump
--


-- Dumped from database version 17.8 (9c8634e)
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.session DROP CONSTRAINT IF EXISTS "session_userId_fkey";
ALTER TABLE IF EXISTS ONLY public.savings_goal DROP CONSTRAINT IF EXISTS fk_savings_goal_user;
ALTER TABLE IF EXISTS ONLY public.income DROP CONSTRAINT IF EXISTS fk_income_user;
ALTER TABLE IF EXISTS ONLY public.income DROP CONSTRAINT IF EXISTS fk_income_category;
ALTER TABLE IF EXISTS ONLY public.expense DROP CONSTRAINT IF EXISTS fk_expense_user;
ALTER TABLE IF EXISTS ONLY public.expense DROP CONSTRAINT IF EXISTS fk_expense_category;
ALTER TABLE IF EXISTS ONLY public.category DROP CONSTRAINT IF EXISTS fk_category_user;
ALTER TABLE IF EXISTS ONLY public.account DROP CONSTRAINT IF EXISTS "account_userId_fkey";
DROP INDEX IF EXISTS public.verification_identifier_idx;
DROP INDEX IF EXISTS public."session_userId_idx";
DROP INDEX IF EXISTS public.idx_savings_goal_user_id;
DROP INDEX IF EXISTS public.idx_savings_goal_user_completed;
DROP INDEX IF EXISTS public.idx_income_user_id;
DROP INDEX IF EXISTS public.idx_income_user_date;
DROP INDEX IF EXISTS public.idx_income_date;
DROP INDEX IF EXISTS public.idx_income_category_id;
DROP INDEX IF EXISTS public.idx_expense_user_id;
DROP INDEX IF EXISTS public.idx_expense_user_date;
DROP INDEX IF EXISTS public.idx_expense_date;
DROP INDEX IF EXISTS public.idx_expense_category_id;
DROP INDEX IF EXISTS public.idx_category_user_type;
DROP INDEX IF EXISTS public.idx_category_user_id;
DROP INDEX IF EXISTS public.idx_category_type;
DROP INDEX IF EXISTS public."account_userId_idx";
ALTER TABLE IF EXISTS ONLY public.verification DROP CONSTRAINT IF EXISTS verification_pkey;
ALTER TABLE IF EXISTS ONLY public."user" DROP CONSTRAINT IF EXISTS user_pkey;
ALTER TABLE IF EXISTS ONLY public."user" DROP CONSTRAINT IF EXISTS user_email_key;
ALTER TABLE IF EXISTS ONLY public.category DROP CONSTRAINT IF EXISTS uk_category_name_user;
ALTER TABLE IF EXISTS ONLY public.session DROP CONSTRAINT IF EXISTS session_token_key;
ALTER TABLE IF EXISTS ONLY public.session DROP CONSTRAINT IF EXISTS session_pkey;
ALTER TABLE IF EXISTS ONLY public.savings_goal DROP CONSTRAINT IF EXISTS savings_goal_pkey;
ALTER TABLE IF EXISTS ONLY public.income DROP CONSTRAINT IF EXISTS income_pkey;
ALTER TABLE IF EXISTS ONLY public.expense DROP CONSTRAINT IF EXISTS expense_pkey;
ALTER TABLE IF EXISTS ONLY public.category DROP CONSTRAINT IF EXISTS category_pkey;
ALTER TABLE IF EXISTS ONLY public.account DROP CONSTRAINT IF EXISTS account_pkey;
DROP TABLE IF EXISTS public.verification;
DROP TABLE IF EXISTS public."user";
DROP TABLE IF EXISTS public.session;
DROP TABLE IF EXISTS public.savings_goal;
DROP TABLE IF EXISTS public.income;
DROP TABLE IF EXISTS public.expense;
DROP TABLE IF EXISTS public.category;
DROP TABLE IF EXISTS public.account;
DROP TYPE IF EXISTS public.currency_code;
DROP TYPE IF EXISTS public.category_type;
--
-- Name: category_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.category_type AS ENUM (
    'expense',
    'income'
);


--
-- Name: currency_code; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.currency_code AS ENUM (
    'AED',
    'AFN',
    'ALL',
    'AMD',
    'ANG',
    'AOA',
    'ARS',
    'AUD',
    'AWG',
    'AZN',
    'BAM',
    'BBD',
    'BDT',
    'BGN',
    'BHD',
    'BIF',
    'BMD',
    'BND',
    'BOB',
    'BOV',
    'BRL',
    'BSD',
    'BTN',
    'BWP',
    'BYN',
    'BZD',
    'CAD',
    'CDF',
    'CHE',
    'CHF',
    'CHW',
    'CLF',
    'CLP',
    'CNY',
    'COP',
    'COU',
    'CRC',
    'CUC',
    'CUP',
    'CVE',
    'CZK',
    'DJF',
    'DKK',
    'DOP',
    'DZD',
    'EGP',
    'ERN',
    'ETB',
    'EUR',
    'FJD',
    'FKP',
    'GBP',
    'GEL',
    'GHS',
    'GIP',
    'GMD',
    'GNF',
    'GTQ',
    'GYD',
    'HKD',
    'HNL',
    'HTG',
    'HUF',
    'IDR',
    'ILS',
    'INR',
    'IQD',
    'IRR',
    'ISK',
    'JMD',
    'JOD',
    'JPY',
    'KES',
    'KGS',
    'KHR',
    'KMF',
    'KPW',
    'KRW',
    'KWD',
    'KYD',
    'KZT',
    'LAK',
    'LBP',
    'LKR',
    'LRD',
    'LSL',
    'LYD',
    'MAD',
    'MDL',
    'MGA',
    'MKD',
    'MMK',
    'MNT',
    'MOP',
    'MRU',
    'MUR',
    'MVR',
    'MWK',
    'MXN',
    'MXV',
    'MYR',
    'MZN',
    'NAD',
    'NGN',
    'NIO',
    'NOK',
    'NPR',
    'NZD',
    'OMR',
    'PAB',
    'PEN',
    'PGK',
    'PHP',
    'PKR',
    'PLN',
    'PYG',
    'QAR',
    'RON',
    'RSD',
    'RUB',
    'RWF',
    'SAR',
    'SBD',
    'SCR',
    'SDG',
    'SEK',
    'SGD',
    'SHP',
    'SLE',
    'SOS',
    'SRD',
    'SSP',
    'STN',
    'SVC',
    'SYP',
    'SZL',
    'THB',
    'TJS',
    'TMT',
    'TND',
    'TOP',
    'TRY',
    'TTD',
    'TWD',
    'TZS',
    'UAH',
    'UGX',
    'USD',
    'USN',
    'UYI',
    'UYU',
    'UYW',
    'UZS',
    'VED',
    'VES',
    'VND',
    'VUV',
    'WST',
    'XAF',
    'XAG',
    'XAU',
    'XBA',
    'XBB',
    'XBC',
    'XBD',
    'XCD',
    'XDR',
    'XOF',
    'XPD',
    'XPF',
    'XPT',
    'XSU',
    'XTS',
    'XUA',
    'XXX',
    'YER',
    'ZAR',
    'ZMW',
    'ZWG'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account (
    id text NOT NULL,
    "accountId" text NOT NULL,
    "providerId" text NOT NULL,
    "userId" text NOT NULL,
    "accessToken" text,
    "refreshToken" text,
    "idToken" text,
    "accessTokenExpiresAt" timestamp with time zone,
    "refreshTokenExpiresAt" timestamp with time zone,
    scope text,
    password text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


--
-- Name: category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    type public.category_type NOT NULL,
    icon character varying(100) NOT NULL,
    stroke_color character varying(50) NOT NULL,
    background_color character varying(50) NOT NULL,
    user_id text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.category ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: expense; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.expense (
    id integer NOT NULL,
    amount integer NOT NULL,
    category_id integer NOT NULL,
    user_id text NOT NULL,
    date date NOT NULL,
    description character varying(500),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT expense_amount_check CHECK ((amount > 0))
);


--
-- Name: expense_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.expense ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.expense_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: income; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.income (
    id integer NOT NULL,
    amount integer NOT NULL,
    category_id integer NOT NULL,
    user_id text NOT NULL,
    date date NOT NULL,
    description character varying(500),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT income_amount_check CHECK ((amount > 0))
);


--
-- Name: income_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.income ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.income_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: savings_goal; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.savings_goal (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    initial_amount integer DEFAULT 0 NOT NULL,
    current_amount integer DEFAULT 0 NOT NULL,
    target_amount integer NOT NULL,
    start_date date NOT NULL,
    is_completed boolean DEFAULT false NOT NULL,
    completed_date date,
    notes character varying(500),
    currency public.currency_code NOT NULL,
    user_id text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT savings_goal_current_amount_check CHECK (((current_amount >= 0) AND (current_amount <= 1000000000))),
    CONSTRAINT savings_goal_initial_amount_check CHECK (((initial_amount >= 0) AND (initial_amount <= 1000000000))),
    CONSTRAINT savings_goal_target_amount_check CHECK (((target_amount > 0) AND (target_amount <= 1000000000))),
    CONSTRAINT savings_goal_target_gt_initial_check CHECK ((target_amount > initial_amount))
);


--
-- Name: savings_goal_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.savings_goal ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.savings_goal_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    id text NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ipAddress" text,
    "userAgent" text,
    "userId" text NOT NULL
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "emailVerified" boolean NOT NULL,
    image text,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    currency public.currency_code DEFAULT 'MDL'::public.currency_code NOT NULL
);


--
-- Name: verification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.verification (
    id text NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: expense expense_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_pkey PRIMARY KEY (id);


--
-- Name: income income_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.income
    ADD CONSTRAINT income_pkey PRIMARY KEY (id);


--
-- Name: savings_goal savings_goal_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.savings_goal
    ADD CONSTRAINT savings_goal_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: session session_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_token_key UNIQUE (token);


--
-- Name: category uk_category_name_user; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT uk_category_name_user UNIQUE (user_id, name);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: verification verification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verification
    ADD CONSTRAINT verification_pkey PRIMARY KEY (id);


--
-- Name: account_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "account_userId_idx" ON public.account USING btree ("userId");


--
-- Name: idx_category_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_category_type ON public.category USING btree (type);


--
-- Name: idx_category_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_category_user_id ON public.category USING btree (user_id);


--
-- Name: idx_category_user_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_category_user_type ON public.category USING btree (user_id, type);


--
-- Name: idx_expense_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_category_id ON public.expense USING btree (category_id);


--
-- Name: idx_expense_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_date ON public.expense USING btree (date);


--
-- Name: idx_expense_user_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_user_date ON public.expense USING btree (user_id, date);


--
-- Name: idx_expense_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_expense_user_id ON public.expense USING btree (user_id);


--
-- Name: idx_income_category_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_income_category_id ON public.income USING btree (category_id);


--
-- Name: idx_income_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_income_date ON public.income USING btree (date);


--
-- Name: idx_income_user_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_income_user_date ON public.income USING btree (user_id, date);


--
-- Name: idx_income_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_income_user_id ON public.income USING btree (user_id);


--
-- Name: idx_savings_goal_user_completed; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_savings_goal_user_completed ON public.savings_goal USING btree (user_id, is_completed);


--
-- Name: idx_savings_goal_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_savings_goal_user_id ON public.savings_goal USING btree (user_id);


--
-- Name: session_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "session_userId_idx" ON public.session USING btree ("userId");


--
-- Name: verification_identifier_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX verification_identifier_idx ON public.verification USING btree (identifier);


--
-- Name: account account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- Name: category fk_category_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT fk_category_user FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: expense fk_expense_category; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT fk_expense_category FOREIGN KEY (category_id) REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: expense fk_expense_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT fk_expense_user FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: income fk_income_category; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.income
    ADD CONSTRAINT fk_income_category FOREIGN KEY (category_id) REFERENCES public.category(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: income fk_income_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.income
    ADD CONSTRAINT fk_income_user FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: savings_goal fk_savings_goal_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.savings_goal
    ADD CONSTRAINT fk_savings_goal_user FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: session session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


