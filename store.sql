PGDMP                         {           store    14.5    14.5 @    A           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            B           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            C           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            D           1262    16680    store    DATABASE     c   CREATE DATABASE store WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Russian_Ukraine.1251';
    DROP DATABASE store;
                postgres    false            �            1259    16694    project_categories    TABLE     n   CREATE TABLE public.project_categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);
 &   DROP TABLE public.project_categories;
       public         heap    postgres    false            �            1259    16693    categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categories_id_seq;
       public          postgres    false    210            E           0    0    categories_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.categories_id_seq OWNED BY public.project_categories.id;
          public          postgres    false    209            �            1259    16738    order_items    TABLE     �   CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer NOT NULL
);
    DROP TABLE public.order_items;
       public         heap    postgres    false            �            1259    16737    order_items_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.order_items_id_seq;
       public          postgres    false    218            F           0    0    order_items_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;
          public          postgres    false    217            �            1259    16726    orders    TABLE     e   CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer,
    date date NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16725    orders_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.orders_id_seq;
       public          postgres    false    216            G           0    0    orders_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;
          public          postgres    false    215            �            1259    16761    product_categories_id_seq    SEQUENCE     �   CREATE SEQUENCE public.product_categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.product_categories_id_seq;
       public          postgres    false            �            1259    16754    product_categories    TABLE     �   CREATE TABLE public.product_categories (
    id integer DEFAULT nextval('public.product_categories_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL
);
 &   DROP TABLE public.product_categories;
       public         heap    postgres    false    220            �            1259    16795    product_images_id_seq    SEQUENCE     ~   CREATE SEQUENCE public.product_images_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.product_images_id_seq;
       public          postgres    false            �            1259    16788    product_images    TABLE     �   CREATE TABLE public.product_images (
    id integer DEFAULT nextval('public.product_images_id_seq'::regclass) NOT NULL,
    product_id integer NOT NULL,
    path character varying NOT NULL,
    main_photo boolean
);
 "   DROP TABLE public.product_images;
       public         heap    postgres    false    224            �            1259    16701    products    TABLE       CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    price numeric(10,2) NOT NULL,
    project_category_id integer NOT NULL,
    product_category_id integer NOT NULL,
    seller_id integer NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16700    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    212            H           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    211            �            1259    16770    sellers_id_seq    SEQUENCE     w   CREATE SEQUENCE public.sellers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.sellers_id_seq;
       public          postgres    false            �            1259    16763    sellers    TABLE     �   CREATE TABLE public.sellers (
    id integer DEFAULT nextval('public.sellers_id_seq'::regclass) NOT NULL,
    name character varying NOT NULL,
    address character varying,
    contact_info character varying NOT NULL
);
    DROP TABLE public.sellers;
       public         heap    postgres    false    222            �            1259    16715    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16714    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    214            I           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    213            �           2604    16741    order_items id    DEFAULT     p   ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);
 =   ALTER TABLE public.order_items ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    16729 	   orders id    DEFAULT     f   ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);
 8   ALTER TABLE public.orders ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    16704    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212                       2604    16697    project_categories id    DEFAULT     v   ALTER TABLE ONLY public.project_categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
 D   ALTER TABLE public.project_categories ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            �           2604    16718    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            8          0    16738    order_items 
   TABLE DATA           I   COPY public.order_items (id, order_id, product_id, quantity) FROM stdin;
    public          postgres    false    218   �H       6          0    16726    orders 
   TABLE DATA           3   COPY public.orders (id, user_id, date) FROM stdin;
    public          postgres    false    216   I       9          0    16754    product_categories 
   TABLE DATA           6   COPY public.product_categories (id, name) FROM stdin;
    public          postgres    false    219   "I       =          0    16788    product_images 
   TABLE DATA           J   COPY public.product_images (id, product_id, path, main_photo) FROM stdin;
    public          postgres    false    223   gI       2          0    16701    products 
   TABLE DATA           u   COPY public.products (id, name, description, price, project_category_id, product_category_id, seller_id) FROM stdin;
    public          postgres    false    212   �I       0          0    16694    project_categories 
   TABLE DATA           6   COPY public.project_categories (id, name) FROM stdin;
    public          postgres    false    210   nJ       ;          0    16763    sellers 
   TABLE DATA           B   COPY public.sellers (id, name, address, contact_info) FROM stdin;
    public          postgres    false    221   �J       4          0    16715    users 
   TABLE DATA           :   COPY public.users (id, name, email, password) FROM stdin;
    public          postgres    false    214   7K       J           0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categories_id_seq', 4, true);
          public          postgres    false    209            K           0    0    order_items_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);
          public          postgres    false    217            L           0    0    orders_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.orders_id_seq', 1, false);
          public          postgres    false    215            M           0    0    product_categories_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.product_categories_id_seq', 2, true);
          public          postgres    false    220            N           0    0    product_images_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.product_images_id_seq', 10, true);
          public          postgres    false    224            O           0    0    products_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.products_id_seq', 6, true);
          public          postgres    false    211            P           0    0    sellers_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.sellers_id_seq', 1, true);
          public          postgres    false    222            Q           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 1, false);
          public          postgres    false    213            �           2606    16699 "   project_categories categories_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.project_categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.project_categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    210            �           2606    16743    order_items order_items_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_pkey;
       public            postgres    false    218            �           2606    16731    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    216            �           2606    16760 *   product_categories product_categories_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT product_categories_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public.product_categories DROP CONSTRAINT product_categories_pkey;
       public            postgres    false    219            �           2606    16794 "   product_images product_images_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.product_images DROP CONSTRAINT product_images_pkey;
       public            postgres    false    223            �           2606    16785    products product_unique 
   CONSTRAINT     f   ALTER TABLE ONLY public.products
    ADD CONSTRAINT product_unique UNIQUE (name) INCLUDE (seller_id);
 A   ALTER TABLE ONLY public.products DROP CONSTRAINT product_unique;
       public            postgres    false    212    212            �           2606    16708    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    212            �           2606    16783 /   product_categories project_category_name_unique 
   CONSTRAINT     j   ALTER TABLE ONLY public.product_categories
    ADD CONSTRAINT project_category_name_unique UNIQUE (name);
 Y   ALTER TABLE ONLY public.product_categories DROP CONSTRAINT project_category_name_unique;
       public            postgres    false    219            �           2606    16769    sellers sellers_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.sellers
    ADD CONSTRAINT sellers_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.sellers DROP CONSTRAINT sellers_pkey;
       public            postgres    false    221            �           2606    16724    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    214            �           2606    16722    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    214            �           2606    16744 %   order_items order_items_order_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);
 O   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_order_id_fkey;
       public          postgres    false    3218    218    216            �           2606    16749 '   order_items order_items_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id);
 Q   ALTER TABLE ONLY public.order_items DROP CONSTRAINT order_items_product_id_fkey;
       public          postgres    false    212    3212    218            �           2606    16732    orders orders_user_id_fkey    FK CONSTRAINT     y   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_user_id_fkey;
       public          postgres    false    216    214    3216            �           2606    16772 !   products product_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT product_category_id_fkey FOREIGN KEY (product_category_id) REFERENCES public.product_categories(id) NOT VALID;
 K   ALTER TABLE ONLY public.products DROP CONSTRAINT product_category_id_fkey;
       public          postgres    false    219    212    3222            �           2606    16797 -   product_images product_images_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_images
    ADD CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) NOT VALID;
 W   ALTER TABLE ONLY public.product_images DROP CONSTRAINT product_images_product_id_fkey;
       public          postgres    false    223    3212    212            �           2606    16709 !   products project_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT project_category_id_fkey FOREIGN KEY (project_category_id) REFERENCES public.project_categories(id) ON DELETE CASCADE;
 K   ALTER TABLE ONLY public.products DROP CONSTRAINT project_category_id_fkey;
       public          postgres    false    210    212    3208            �           2606    16777    products seller_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT seller_id_fkey FOREIGN KEY (seller_id) REFERENCES public.sellers(id) NOT VALID;
 A   ALTER TABLE ONLY public.products DROP CONSTRAINT seller_id_fkey;
       public          postgres    false    212    3226    221            8      x������ � �      6      x������ � �      9   5   x�3�0����.l��$7]��e�ya��f s녽�]l���+F��� w��      =   Q   x�3�4����MLO-�O�O��*H�L�2D-.�L)JLI�J�s� k(�pY 	''�@#�S�Ukh�i����=... �,l      2   �   x�M�A
�0EדS�%���x���nčP7���M���F��2���̛���=&=a@�,f$�32F���F�s�sX޴�+�I;��*ޘؙ�b�~,�(�
�
�y��pu�鞵����	n�,�ӃlēÙ�/��e��1��i      0   `   x�%���0�jn�L�� ���b J�RB 3�6�$�W�~E�­QG^�����i8�p�֪�@��K�1���6r��ϳ�`���D�N�\D>{DS      ;   I   x�3估�®�.쾰A�Q�4C��.6y;.�]�W��taPz�.��/&�S�����������Ԍ+F��� ���      4      x������ � �     