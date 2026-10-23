import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_projects_blocks_image_size" AS ENUM('wide', 'text');
  CREATE TYPE "public"."enum_projects_blocks_callout_kind" AS ENUM('collaboration', 'decision', 'result', 'learning');
  CREATE TYPE "public"."enum_projects_blocks_prototype_format" AS ENUM('desktop', 'mobile');
  CREATE TYPE "public"."enum_projects_discipline" AS ENUM('mobile', 'web', 'system', 'other');
  CREATE TYPE "public"."enum_projects_cover_tone" AS ENUM('accent', 'primary', 'soft');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_blocks_image_size" AS ENUM('wide', 'text');
  CREATE TYPE "public"."enum__projects_v_blocks_callout_kind" AS ENUM('collaboration', 'decision', 'result', 'learning');
  CREATE TYPE "public"."enum__projects_v_blocks_prototype_format" AS ENUM('desktop', 'mobile');
  CREATE TYPE "public"."enum__projects_v_version_discipline" AS ENUM('mobile', 'web', 'system', 'other');
  CREATE TYPE "public"."enum__projects_v_version_cover_tone" AS ENUM('accent', 'primary', 'soft');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_services_icon" AS ENUM('layout', 'search', 'code', 'pen', 'mobile', 'users', 'components', 'cursor');
  CREATE TYPE "public"."enum_tools_group" AS ENUM('design', 'tech');
  CREATE TYPE "public"."enum_messages_status" AS ENUM('new', 'read', 'answered', 'archived');
  CREATE TYPE "public"."enum_analytics_events_type" AS ENUM('pageview', 'cv_download', 'contact_submit', 'outbound');
  CREATE TYPE "public"."enum_home_page_blocks_hero_cursors_kind" AS ENUM('tag', 'bubble');
  CREATE TYPE "public"."enum_home_page_blocks_hero_cursors_tone" AS ENUM('primary', 'light', 'accent');
  CREATE TYPE "public"."enum_home_page_blocks_hero_secondary_cta_action" AS ENUM('cv', 'link');
  CREATE TYPE "public"."enum_home_page_blocks_marquee_speed" AS ENUM('static', 'slow', 'normal', 'fast');
  CREATE TYPE "public"."enum_home_page_blocks_about_chips_tone" AS ENUM('light', 'dark', 'accent');
  CREATE TYPE "public"."enum_home_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_blocks_hero_cursors_kind" AS ENUM('tag', 'bubble');
  CREATE TYPE "public"."enum__home_page_v_blocks_hero_cursors_tone" AS ENUM('primary', 'light', 'accent');
  CREATE TYPE "public"."enum__home_page_v_blocks_hero_secondary_cta_action" AS ENUM('cv', 'link');
  CREATE TYPE "public"."enum__home_page_v_blocks_marquee_speed" AS ENUM('static', 'slow', 'normal', 'fast');
  CREATE TYPE "public"."enum__home_page_v_blocks_about_chips_tone" AS ENUM('light', 'dark', 'accent');
  CREATE TYPE "public"."enum__home_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_page_v_published_locale" AS ENUM('fr', 'en');
  CREATE TYPE "public"."enum_theme_typography_heading_font" AS ENUM('plus-jakarta-sans', 'outfit', 'dm-sans', 'manrope', 'fraunces');
  CREATE TYPE "public"."enum_theme_typography_body_font" AS ENUM('plus-jakarta-sans', 'outfit', 'dm-sans', 'manrope', 'fraunces');
  CREATE TYPE "public"."enum_theme_typography_script_font" AS ENUM('caveat', 'dancing-script');
  CREATE TYPE "public"."enum_theme_shape_button_style" AS ENUM('pill', 'rounded', 'square');
  CREATE TYPE "public"."enum__theme_v_version_typography_heading_font" AS ENUM('plus-jakarta-sans', 'outfit', 'dm-sans', 'manrope', 'fraunces');
  CREATE TYPE "public"."enum__theme_v_version_typography_body_font" AS ENUM('plus-jakarta-sans', 'outfit', 'dm-sans', 'manrope', 'fraunces');
  CREATE TYPE "public"."enum__theme_v_version_typography_script_font" AS ENUM('caveat', 'dancing-script');
  CREATE TYPE "public"."enum__theme_v_version_shape_button_style" AS ENUM('pill', 'rounded', 'square');
  CREATE TYPE "public"."enum_site_settings_availability" AS ENUM('available', 'soon', 'unavailable');
  CREATE TYPE "public"."enum_site_settings_work_mode" AS ENUM('remote', 'hybrid', 'onsite');
  CREATE TYPE "public"."enum_site_settings_animations" AS ENUM('none', 'subtle', 'normal');
  CREATE TYPE "public"."enum__site_settings_v_version_availability" AS ENUM('available', 'soon', 'unavailable');
  CREATE TYPE "public"."enum__site_settings_v_version_work_mode" AS ENUM('remote', 'hybrid', 'onsite');
  CREATE TYPE "public"."enum__site_settings_v_version_animations" AS ENUM('none', 'subtle', 'normal');
  CREATE TABLE "projects_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_text_section_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum_projects_blocks_image_size" DEFAULT 'wide',
  	"framed" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_image_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "projects_blocks_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_quote_locales" (
  	"text" varchar,
  	"author" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_projects_blocks_callout_kind" DEFAULT 'collaboration',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_callout_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_key_points_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_blocks_key_points_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_key_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_key_points_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_blocks_prototype" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"format" "enum_projects_blocks_prototype_format" DEFAULT 'desktop',
  	"block_name" varchar
  );
  
  CREATE TABLE "projects_blocks_prototype_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar
  );
  
  CREATE TABLE "projects_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"is_example" boolean DEFAULT false,
  	"featured" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"discipline" "enum_projects_discipline" DEFAULT 'mobile',
  	"year" numeric,
  	"cover_id" integer,
  	"cover_tone" "enum_projects_cover_tone" DEFAULT 'accent',
  	"facts_tools" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_locales" (
  	"title" varchar,
  	"frame_label" varchar,
  	"summary" varchar,
  	"tags" varchar,
  	"intro" varchar,
  	"facts_client" varchar,
  	"facts_role" varchar,
  	"facts_duration" varchar,
  	"facts_team" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_text_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_text_section_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"size" "enum__projects_v_blocks_image_size" DEFAULT 'wide',
  	"framed" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_image_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_gallery_images_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_quote_locales" (
  	"text" varchar,
  	"author" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__projects_v_blocks_callout_kind" DEFAULT 'collaboration',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_callout_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_key_points_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_key_points_items_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_key_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_key_points_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_blocks_prototype" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"format" "enum__projects_v_blocks_prototype_format" DEFAULT 'desktop',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_projects_v_blocks_prototype_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_is_example" boolean DEFAULT false,
  	"version_featured" boolean DEFAULT true,
  	"version_order" numeric DEFAULT 0,
  	"version_discipline" "enum__projects_v_version_discipline" DEFAULT 'mobile',
  	"version_year" numeric,
  	"version_cover_id" integer,
  	"version_cover_tone" "enum__projects_v_version_cover_tone" DEFAULT 'accent',
  	"version_facts_tools" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__projects_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_title" varchar,
  	"version_frame_label" varchar,
  	"version_summary" varchar,
  	"version_tags" varchar,
  	"version_intro" varchar,
  	"version_facts_client" varchar,
  	"version_facts_role" varchar,
  	"version_facts_duration" varchar,
  	"version_facts_team" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum_services_icon" DEFAULT 'layout',
  	"highlighted" boolean,
  	"visible" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company" varchar NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"current" boolean,
  	"visible" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "experiences_locales" (
  	"role" varchar NOT NULL,
  	"location" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "education" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"school" varchar NOT NULL,
  	"start_year" numeric,
  	"end_year" numeric,
  	"visible" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "education_locales" (
  	"degree" varchar NOT NULL,
  	"field" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "certifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"issuer" varchar NOT NULL,
  	"date" timestamp(3) with time zone,
  	"credential_url" varchar,
  	"visible" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "certifications_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tools" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"group" "enum_tools_group" DEFAULT 'design',
  	"visible" boolean DEFAULT true,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "legal_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "legal_pages_locales" (
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prefix" varchar DEFAULT '',
  	"_objectkey" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "messages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"subject" varchar,
  	"message" varchar NOT NULL,
  	"status" "enum_messages_status" DEFAULT 'new',
  	"locale" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "analytics_events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_analytics_events_type" NOT NULL,
  	"path" varchar,
  	"locale" varchar,
  	"visitor" varchar,
  	"referrer" varchar,
  	"device" varchar,
  	"browser" varchar,
  	"country" varchar,
  	"target" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"projects_id" integer,
  	"services_id" integer,
  	"experiences_id" integer,
  	"education_id" integer,
  	"certifications_id" integer,
  	"tools_id" integer,
  	"legal_pages_id" integer,
  	"media_id" integer,
  	"messages_id" integer,
  	"analytics_events_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_hero_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_hero_badges_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_hero_cursors" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_home_page_blocks_hero_cursors_kind" DEFAULT 'tag',
  	"tone" "enum_home_page_blocks_hero_cursors_tone" DEFAULT 'primary',
  	"x" numeric DEFAULT 0,
  	"y" numeric DEFAULT 50
  );
  
  CREATE TABLE "home_page_blocks_hero_cursors_locales" (
  	"name" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean,
  	"anchor" varchar,
  	"size_tag" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_action" "enum_home_page_blocks_hero_secondary_cta_action" DEFAULT 'cv',
  	"secondary_cta_href" varchar,
  	"portrait_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_hero_locales" (
  	"greeting" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_marquee_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean,
  	"anchor" varchar,
  	"speed" "enum_home_page_blocks_marquee_speed" DEFAULT 'normal',
  	"tilt" numeric DEFAULT -1.6,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean,
  	"anchor" varchar,
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_services_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean,
  	"anchor" varchar,
  	"cta_href" varchar,
  	"limit" numeric DEFAULT 3,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_projects_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_about_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tone" "enum_home_page_blocks_about_chips_tone" DEFAULT 'light'
  );
  
  CREATE TABLE "home_page_blocks_about_chips_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_about_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_about_facts_locales" (
  	"value" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean,
  	"anchor" varchar,
  	"photo_id" integer,
  	"signature" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_about_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"bio" varchar,
  	"cv_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean,
  	"anchor" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_tools_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_blocks_contact_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"hidden" boolean,
  	"anchor" varchar,
  	"show_email" boolean DEFAULT true,
  	"cta_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "home_page_blocks_contact_cta_locales" (
  	"kicker" varchar,
  	"title" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_home_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_home_page_v_blocks_hero_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_hero_badges_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_blocks_hero_cursors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__home_page_v_blocks_hero_cursors_kind" DEFAULT 'tag',
  	"tone" "enum__home_page_v_blocks_hero_cursors_tone" DEFAULT 'primary',
  	"x" numeric DEFAULT 0,
  	"y" numeric DEFAULT 50,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_hero_cursors_locales" (
  	"name" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean,
  	"anchor" varchar,
  	"size_tag" varchar,
  	"primary_cta_href" varchar,
  	"secondary_cta_action" "enum__home_page_v_blocks_hero_secondary_cta_action" DEFAULT 'cv',
  	"secondary_cta_href" varchar,
  	"portrait_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_hero_locales" (
  	"greeting" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"primary_cta_label" varchar,
  	"secondary_cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_blocks_marquee_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_marquee_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_blocks_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean,
  	"anchor" varchar,
  	"speed" "enum__home_page_v_blocks_marquee_speed" DEFAULT 'normal',
  	"tilt" numeric DEFAULT -1.6,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean,
  	"anchor" varchar,
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_services_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_blocks_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean,
  	"anchor" varchar,
  	"cta_href" varchar,
  	"limit" numeric DEFAULT 3,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_projects_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_blocks_about_chips" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tone" "enum__home_page_v_blocks_about_chips_tone" DEFAULT 'light',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_about_chips_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_blocks_about_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_about_facts_locales" (
  	"value" varchar,
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_blocks_about" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean,
  	"anchor" varchar,
  	"photo_id" integer,
  	"signature" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_about_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"bio" varchar,
  	"cv_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_blocks_tools" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean,
  	"anchor" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_tools_locales" (
  	"eyebrow" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v_blocks_contact_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"hidden" boolean,
  	"anchor" varchar,
  	"show_email" boolean DEFAULT true,
  	"cta_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_home_page_v_blocks_contact_cta_locales" (
  	"kicker" varchar,
  	"title" varchar,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_home_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__home_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__home_page_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "pages_content_services_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_content_services_process_steps_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"deliverables" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_content_about_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_content_about_values_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_content_about_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_content_about_languages_locales" (
  	"name" varchar NOT NULL,
  	"level" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"projects_cta_show" boolean DEFAULT true,
  	"projects_cta_href" varchar,
  	"services_opportunities_show" boolean DEFAULT true,
  	"services_cta_show" boolean DEFAULT true,
  	"services_cta_href" varchar,
  	"about_photo_id" integer,
  	"about_cta_show" boolean DEFAULT true,
  	"about_cta_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pages_content_locales" (
  	"projects_eyebrow" varchar,
  	"projects_title" varchar NOT NULL,
  	"projects_intro" varchar,
  	"projects_all_label" varchar,
  	"projects_filter_labels_mobile" varchar,
  	"projects_filter_labels_web" varchar,
  	"projects_filter_labels_system" varchar,
  	"projects_filter_labels_other" varchar,
  	"projects_empty_text" varchar,
  	"projects_case_study_labels_client" varchar,
  	"projects_case_study_labels_role" varchar,
  	"projects_case_study_labels_duration" varchar,
  	"projects_case_study_labels_team" varchar,
  	"projects_case_study_labels_tools" varchar,
  	"projects_case_study_labels_year" varchar,
  	"projects_case_study_labels_back" varchar,
  	"projects_case_study_labels_next" varchar,
  	"projects_cta_kicker" varchar,
  	"projects_cta_title" varchar,
  	"projects_cta_label" varchar,
  	"projects_seo_title" varchar,
  	"projects_seo_description" varchar,
  	"services_eyebrow" varchar,
  	"services_title" varchar NOT NULL,
  	"services_intro" varchar,
  	"services_process_eyebrow" varchar,
  	"services_process_title" varchar,
  	"services_opportunities_title" varchar,
  	"services_opportunities_text" varchar,
  	"services_cta_kicker" varchar,
  	"services_cta_title" varchar,
  	"services_cta_label" varchar,
  	"services_seo_title" varchar,
  	"services_seo_description" varchar,
  	"about_eyebrow" varchar,
  	"about_title" varchar NOT NULL,
  	"about_intro" varchar,
  	"about_story" jsonb,
  	"about_headings_values" varchar,
  	"about_headings_experience" varchar,
  	"about_headings_education" varchar,
  	"about_headings_certifications" varchar,
  	"about_headings_tools" varchar,
  	"about_headings_languages" varchar,
  	"about_headings_present" varchar,
  	"about_headings_verify" varchar,
  	"about_headings_cv" varchar,
  	"about_cta_kicker" varchar,
  	"about_cta_title" varchar,
  	"about_cta_label" varchar,
  	"about_seo_title" varchar,
  	"about_seo_description" varchar,
  	"contact_eyebrow" varchar,
  	"contact_title" varchar NOT NULL,
  	"contact_intro" varchar,
  	"contact_note" varchar,
  	"contact_seo_title" varchar,
  	"contact_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_content_v_version_services_process_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_content_v_version_services_process_steps_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"deliverables" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_content_v_version_about_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_content_v_version_about_values_locales" (
  	"title" varchar NOT NULL,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_content_v_version_about_languages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_content_v_version_about_languages_locales" (
  	"name" varchar NOT NULL,
  	"level" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_projects_cta_show" boolean DEFAULT true,
  	"version_projects_cta_href" varchar,
  	"version_services_opportunities_show" boolean DEFAULT true,
  	"version_services_cta_show" boolean DEFAULT true,
  	"version_services_cta_href" varchar,
  	"version_about_photo_id" integer,
  	"version_about_cta_show" boolean DEFAULT true,
  	"version_about_cta_href" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_pages_content_v_locales" (
  	"version_projects_eyebrow" varchar,
  	"version_projects_title" varchar NOT NULL,
  	"version_projects_intro" varchar,
  	"version_projects_all_label" varchar,
  	"version_projects_filter_labels_mobile" varchar,
  	"version_projects_filter_labels_web" varchar,
  	"version_projects_filter_labels_system" varchar,
  	"version_projects_filter_labels_other" varchar,
  	"version_projects_empty_text" varchar,
  	"version_projects_case_study_labels_client" varchar,
  	"version_projects_case_study_labels_role" varchar,
  	"version_projects_case_study_labels_duration" varchar,
  	"version_projects_case_study_labels_team" varchar,
  	"version_projects_case_study_labels_tools" varchar,
  	"version_projects_case_study_labels_year" varchar,
  	"version_projects_case_study_labels_back" varchar,
  	"version_projects_case_study_labels_next" varchar,
  	"version_projects_cta_kicker" varchar,
  	"version_projects_cta_title" varchar,
  	"version_projects_cta_label" varchar,
  	"version_projects_seo_title" varchar,
  	"version_projects_seo_description" varchar,
  	"version_services_eyebrow" varchar,
  	"version_services_title" varchar NOT NULL,
  	"version_services_intro" varchar,
  	"version_services_process_eyebrow" varchar,
  	"version_services_process_title" varchar,
  	"version_services_opportunities_title" varchar,
  	"version_services_opportunities_text" varchar,
  	"version_services_cta_kicker" varchar,
  	"version_services_cta_title" varchar,
  	"version_services_cta_label" varchar,
  	"version_services_seo_title" varchar,
  	"version_services_seo_description" varchar,
  	"version_about_eyebrow" varchar,
  	"version_about_title" varchar NOT NULL,
  	"version_about_intro" varchar,
  	"version_about_story" jsonb,
  	"version_about_headings_values" varchar,
  	"version_about_headings_experience" varchar,
  	"version_about_headings_education" varchar,
  	"version_about_headings_certifications" varchar,
  	"version_about_headings_tools" varchar,
  	"version_about_headings_languages" varchar,
  	"version_about_headings_present" varchar,
  	"version_about_headings_verify" varchar,
  	"version_about_headings_cv" varchar,
  	"version_about_cta_kicker" varchar,
  	"version_about_cta_title" varchar,
  	"version_about_cta_label" varchar,
  	"version_about_seo_title" varchar,
  	"version_about_seo_description" varchar,
  	"version_contact_eyebrow" varchar,
  	"version_contact_title" varchar NOT NULL,
  	"version_contact_intro" varchar,
  	"version_contact_note" varchar,
  	"version_contact_seo_title" varchar,
  	"version_contact_seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "theme" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"palette_primary" varchar DEFAULT '#2B1E3F' NOT NULL,
  	"palette_accent" varchar DEFAULT '#F4A3C3' NOT NULL,
  	"palette_background" varchar DEFAULT '#FCF5F3' NOT NULL,
  	"palette_ink" varchar DEFAULT '#1D1428' NOT NULL,
  	"palette_surface" varchar DEFAULT '#FFFFFF' NOT NULL,
  	"typography_heading_font" "enum_theme_typography_heading_font" DEFAULT 'plus-jakarta-sans',
  	"typography_body_font" "enum_theme_typography_body_font" DEFAULT 'plus-jakarta-sans',
  	"typography_script_font" "enum_theme_typography_script_font" DEFAULT 'caveat',
  	"shape_button_style" "enum_theme_shape_button_style" DEFAULT 'pill',
  	"shape_card_radius" numeric DEFAULT 24 NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_theme_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_palette_primary" varchar DEFAULT '#2B1E3F' NOT NULL,
  	"version_palette_accent" varchar DEFAULT '#F4A3C3' NOT NULL,
  	"version_palette_background" varchar DEFAULT '#FCF5F3' NOT NULL,
  	"version_palette_ink" varchar DEFAULT '#1D1428' NOT NULL,
  	"version_palette_surface" varchar DEFAULT '#FFFFFF' NOT NULL,
  	"version_typography_heading_font" "enum__theme_v_version_typography_heading_font" DEFAULT 'plus-jakarta-sans',
  	"version_typography_body_font" "enum__theme_v_version_typography_body_font" DEFAULT 'plus-jakarta-sans',
  	"version_typography_script_font" "enum__theme_v_version_typography_script_font" DEFAULT 'caveat',
  	"version_shape_button_style" "enum__theme_v_version_shape_button_style" DEFAULT 'pill',
  	"version_shape_card_radius" numeric DEFAULT 24 NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_nav_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_footer_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_opportunity_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"active" boolean DEFAULT true
  );
  
  CREATE TABLE "site_settings_opportunity_types_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar DEFAULT 'Lauraine Djilo' NOT NULL,
  	"brand_name" varchar DEFAULT 'Lauraine' NOT NULL,
  	"monogram" varchar DEFAULT 'L',
  	"email" varchar NOT NULL,
  	"nav_cta_href" varchar NOT NULL,
  	"availability" "enum_site_settings_availability" DEFAULT 'available',
  	"work_mode" "enum_site_settings_work_mode" DEFAULT 'remote',
  	"location" varchar DEFAULT 'Yaoundé, Cameroun',
  	"show_availability" boolean DEFAULT false,
  	"enable_english" boolean DEFAULT true,
  	"detect_browser_language" boolean DEFAULT true,
  	"cv_fr_id" integer,
  	"cv_en_id" integer,
  	"share_image_id" integer,
  	"animations" "enum_site_settings_animations" DEFAULT 'normal',
  	"analytics_enabled" boolean DEFAULT true,
  	"analytics_respect_d_n_t" boolean DEFAULT true,
  	"analytics_retention_months" numeric DEFAULT 13,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"job_title" varchar NOT NULL,
  	"nav_cta_label" varchar NOT NULL,
  	"footer_text" varchar,
  	"availability_message" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_settings_v_version_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_nav_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_settings_v_version_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_footer_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_settings_v_version_opportunity_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"active" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_settings_v_version_opportunity_types_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_full_name" varchar DEFAULT 'Lauraine Djilo' NOT NULL,
  	"version_brand_name" varchar DEFAULT 'Lauraine' NOT NULL,
  	"version_monogram" varchar DEFAULT 'L',
  	"version_email" varchar NOT NULL,
  	"version_nav_cta_href" varchar NOT NULL,
  	"version_availability" "enum__site_settings_v_version_availability" DEFAULT 'available',
  	"version_work_mode" "enum__site_settings_v_version_work_mode" DEFAULT 'remote',
  	"version_location" varchar DEFAULT 'Yaoundé, Cameroun',
  	"version_show_availability" boolean DEFAULT false,
  	"version_enable_english" boolean DEFAULT true,
  	"version_detect_browser_language" boolean DEFAULT true,
  	"version_cv_fr_id" integer,
  	"version_cv_en_id" integer,
  	"version_share_image_id" integer,
  	"version_animations" "enum__site_settings_v_version_animations" DEFAULT 'normal',
  	"version_analytics_enabled" boolean DEFAULT true,
  	"version_analytics_respect_d_n_t" boolean DEFAULT true,
  	"version_analytics_retention_months" numeric DEFAULT 13,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_site_settings_v_locales" (
  	"version_job_title" varchar NOT NULL,
  	"version_nav_cta_label" varchar NOT NULL,
  	"version_footer_text" varchar,
  	"version_availability_message" varchar,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "projects_blocks_text_section" ADD CONSTRAINT "projects_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_text_section_locales" ADD CONSTRAINT "projects_blocks_text_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_text_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_image" ADD CONSTRAINT "projects_blocks_image_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_image" ADD CONSTRAINT "projects_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_image_locales" ADD CONSTRAINT "projects_blocks_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_images" ADD CONSTRAINT "projects_blocks_gallery_images_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_images" ADD CONSTRAINT "projects_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery_images_locales" ADD CONSTRAINT "projects_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_gallery" ADD CONSTRAINT "projects_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_quote" ADD CONSTRAINT "projects_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_quote_locales" ADD CONSTRAINT "projects_blocks_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_callout" ADD CONSTRAINT "projects_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_callout_locales" ADD CONSTRAINT "projects_blocks_callout_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_callout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_key_points_items" ADD CONSTRAINT "projects_blocks_key_points_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_key_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_key_points_items_locales" ADD CONSTRAINT "projects_blocks_key_points_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_key_points_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_key_points" ADD CONSTRAINT "projects_blocks_key_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_key_points_locales" ADD CONSTRAINT "projects_blocks_key_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_key_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_prototype" ADD CONSTRAINT "projects_blocks_prototype_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_blocks_prototype_locales" ADD CONSTRAINT "projects_blocks_prototype_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_blocks_prototype"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_links" ADD CONSTRAINT "projects_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_links_locales" ADD CONSTRAINT "projects_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text_section" ADD CONSTRAINT "_projects_v_blocks_text_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_text_section_locales" ADD CONSTRAINT "_projects_v_blocks_text_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_text_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image" ADD CONSTRAINT "_projects_v_blocks_image_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image" ADD CONSTRAINT "_projects_v_blocks_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_image_locales" ADD CONSTRAINT "_projects_v_blocks_image_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_image"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_images" ADD CONSTRAINT "_projects_v_blocks_gallery_images_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_images" ADD CONSTRAINT "_projects_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery_images_locales" ADD CONSTRAINT "_projects_v_blocks_gallery_images_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_gallery_images"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_gallery" ADD CONSTRAINT "_projects_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_quote" ADD CONSTRAINT "_projects_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_quote_locales" ADD CONSTRAINT "_projects_v_blocks_quote_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_quote"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_callout" ADD CONSTRAINT "_projects_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_callout_locales" ADD CONSTRAINT "_projects_v_blocks_callout_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_callout"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_key_points_items" ADD CONSTRAINT "_projects_v_blocks_key_points_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_key_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_key_points_items_locales" ADD CONSTRAINT "_projects_v_blocks_key_points_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_key_points_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_key_points" ADD CONSTRAINT "_projects_v_blocks_key_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_key_points_locales" ADD CONSTRAINT "_projects_v_blocks_key_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_key_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_prototype" ADD CONSTRAINT "_projects_v_blocks_prototype_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_blocks_prototype_locales" ADD CONSTRAINT "_projects_v_blocks_prototype_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_blocks_prototype"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_links" ADD CONSTRAINT "_projects_v_version_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_links_locales" ADD CONSTRAINT "_projects_v_version_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_locales" ADD CONSTRAINT "experiences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "education_locales" ADD CONSTRAINT "education_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."education"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "certifications_locales" ADD CONSTRAINT "certifications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "legal_pages_locales" ADD CONSTRAINT "legal_pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_education_fk" FOREIGN KEY ("education_id") REFERENCES "public"."education"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_certifications_fk" FOREIGN KEY ("certifications_id") REFERENCES "public"."certifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tools_fk" FOREIGN KEY ("tools_id") REFERENCES "public"."tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_legal_pages_fk" FOREIGN KEY ("legal_pages_id") REFERENCES "public"."legal_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_messages_fk" FOREIGN KEY ("messages_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_analytics_events_fk" FOREIGN KEY ("analytics_events_id") REFERENCES "public"."analytics_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_hero_badges" ADD CONSTRAINT "home_page_blocks_hero_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_hero_badges_locales" ADD CONSTRAINT "home_page_blocks_hero_badges_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_hero_badges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_hero_cursors" ADD CONSTRAINT "home_page_blocks_hero_cursors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_hero_cursors_locales" ADD CONSTRAINT "home_page_blocks_hero_cursors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_hero_cursors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_hero" ADD CONSTRAINT "home_page_blocks_hero_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_hero" ADD CONSTRAINT "home_page_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_hero_locales" ADD CONSTRAINT "home_page_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_marquee_items" ADD CONSTRAINT "home_page_blocks_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_marquee_items_locales" ADD CONSTRAINT "home_page_blocks_marquee_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_marquee_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_marquee" ADD CONSTRAINT "home_page_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_services" ADD CONSTRAINT "home_page_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_services_locales" ADD CONSTRAINT "home_page_blocks_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_projects" ADD CONSTRAINT "home_page_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_projects_locales" ADD CONSTRAINT "home_page_blocks_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_about_chips" ADD CONSTRAINT "home_page_blocks_about_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_about_chips_locales" ADD CONSTRAINT "home_page_blocks_about_chips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_about_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_about_facts" ADD CONSTRAINT "home_page_blocks_about_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_about_facts_locales" ADD CONSTRAINT "home_page_blocks_about_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_about_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_about" ADD CONSTRAINT "home_page_blocks_about_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_blocks_about" ADD CONSTRAINT "home_page_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_about_locales" ADD CONSTRAINT "home_page_blocks_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_tools" ADD CONSTRAINT "home_page_blocks_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_tools_locales" ADD CONSTRAINT "home_page_blocks_tools_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_contact_cta" ADD CONSTRAINT "home_page_blocks_contact_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_blocks_contact_cta_locales" ADD CONSTRAINT "home_page_blocks_contact_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page_blocks_contact_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_hero_badges" ADD CONSTRAINT "_home_page_v_blocks_hero_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_hero_badges_locales" ADD CONSTRAINT "_home_page_v_blocks_hero_badges_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_hero_badges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_hero_cursors" ADD CONSTRAINT "_home_page_v_blocks_hero_cursors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_hero_cursors_locales" ADD CONSTRAINT "_home_page_v_blocks_hero_cursors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_hero_cursors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_hero" ADD CONSTRAINT "_home_page_v_blocks_hero_portrait_id_media_id_fk" FOREIGN KEY ("portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_hero" ADD CONSTRAINT "_home_page_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_hero_locales" ADD CONSTRAINT "_home_page_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_marquee_items" ADD CONSTRAINT "_home_page_v_blocks_marquee_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_marquee"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_marquee_items_locales" ADD CONSTRAINT "_home_page_v_blocks_marquee_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_marquee_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_marquee" ADD CONSTRAINT "_home_page_v_blocks_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_services" ADD CONSTRAINT "_home_page_v_blocks_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_services_locales" ADD CONSTRAINT "_home_page_v_blocks_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_projects" ADD CONSTRAINT "_home_page_v_blocks_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_projects_locales" ADD CONSTRAINT "_home_page_v_blocks_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_about_chips" ADD CONSTRAINT "_home_page_v_blocks_about_chips_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_about_chips_locales" ADD CONSTRAINT "_home_page_v_blocks_about_chips_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_about_chips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_about_facts" ADD CONSTRAINT "_home_page_v_blocks_about_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_about_facts_locales" ADD CONSTRAINT "_home_page_v_blocks_about_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_about_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_about" ADD CONSTRAINT "_home_page_v_blocks_about_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_about" ADD CONSTRAINT "_home_page_v_blocks_about_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_about_locales" ADD CONSTRAINT "_home_page_v_blocks_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_tools" ADD CONSTRAINT "_home_page_v_blocks_tools_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_tools_locales" ADD CONSTRAINT "_home_page_v_blocks_tools_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_tools"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_contact_cta" ADD CONSTRAINT "_home_page_v_blocks_contact_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_page_v_blocks_contact_cta_locales" ADD CONSTRAINT "_home_page_v_blocks_contact_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_page_v_blocks_contact_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_services_process_steps" ADD CONSTRAINT "pages_content_services_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_services_process_steps_locales" ADD CONSTRAINT "pages_content_services_process_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_content_services_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_about_values" ADD CONSTRAINT "pages_content_about_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_about_values_locales" ADD CONSTRAINT "pages_content_about_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_content_about_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_about_languages" ADD CONSTRAINT "pages_content_about_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content_about_languages_locales" ADD CONSTRAINT "pages_content_about_languages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_content_about_languages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_content" ADD CONSTRAINT "pages_content_about_photo_id_media_id_fk" FOREIGN KEY ("about_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_content_locales" ADD CONSTRAINT "pages_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_content_v_version_services_process_steps" ADD CONSTRAINT "_pages_content_v_version_services_process_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_content_v_version_services_process_steps_locales" ADD CONSTRAINT "_pages_content_v_version_services_process_steps_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_content_v_version_services_process_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_content_v_version_about_values" ADD CONSTRAINT "_pages_content_v_version_about_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_content_v_version_about_values_locales" ADD CONSTRAINT "_pages_content_v_version_about_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_content_v_version_about_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_content_v_version_about_languages" ADD CONSTRAINT "_pages_content_v_version_about_languages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_content_v_version_about_languages_locales" ADD CONSTRAINT "_pages_content_v_version_about_languages_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_content_v_version_about_languages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_content_v" ADD CONSTRAINT "_pages_content_v_version_about_photo_id_media_id_fk" FOREIGN KEY ("version_about_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_content_v_locales" ADD CONSTRAINT "_pages_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav_items" ADD CONSTRAINT "site_settings_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav_items_locales" ADD CONSTRAINT "site_settings_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_links" ADD CONSTRAINT "site_settings_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_footer_links_locales" ADD CONSTRAINT "site_settings_footer_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_footer_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_opportunity_types" ADD CONSTRAINT "site_settings_opportunity_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_opportunity_types_locales" ADD CONSTRAINT "site_settings_opportunity_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings_opportunity_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_cv_fr_id_media_id_fk" FOREIGN KEY ("cv_fr_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_cv_en_id_media_id_fk" FOREIGN KEY ("cv_en_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_share_image_id_media_id_fk" FOREIGN KEY ("share_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_social_links" ADD CONSTRAINT "_site_settings_v_version_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_nav_items" ADD CONSTRAINT "_site_settings_v_version_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_nav_items_locales" ADD CONSTRAINT "_site_settings_v_version_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v_version_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_footer_links" ADD CONSTRAINT "_site_settings_v_version_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_footer_links_locales" ADD CONSTRAINT "_site_settings_v_version_footer_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v_version_footer_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_opportunity_types" ADD CONSTRAINT "_site_settings_v_version_opportunity_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v_version_opportunity_types_locales" ADD CONSTRAINT "_site_settings_v_version_opportunity_types_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v_version_opportunity_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_cv_fr_id_media_id_fk" FOREIGN KEY ("version_cv_fr_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_cv_en_id_media_id_fk" FOREIGN KEY ("version_cv_en_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v" ADD CONSTRAINT "_site_settings_v_version_share_image_id_media_id_fk" FOREIGN KEY ("version_share_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_locales" ADD CONSTRAINT "_site_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_blocks_text_section_order_idx" ON "projects_blocks_text_section" USING btree ("_order");
  CREATE INDEX "projects_blocks_text_section_parent_id_idx" ON "projects_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_text_section_path_idx" ON "projects_blocks_text_section" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_text_section_locales_locale_parent_id_unique" ON "projects_blocks_text_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_text_section_locales_parent_id_idx" ON "projects_blocks_text_section_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_order_idx" ON "projects_blocks_image" USING btree ("_order");
  CREATE INDEX "projects_blocks_image_parent_id_idx" ON "projects_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_image_path_idx" ON "projects_blocks_image" USING btree ("_path");
  CREATE INDEX "projects_blocks_image_media_idx" ON "projects_blocks_image" USING btree ("media_id");
  CREATE UNIQUE INDEX "projects_blocks_image_locales_locale_parent_id_unique" ON "projects_blocks_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_image_locales_parent_id_idx" ON "projects_blocks_image_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_images_order_idx" ON "projects_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_images_parent_id_idx" ON "projects_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_images_media_idx" ON "projects_blocks_gallery_images" USING btree ("media_id");
  CREATE UNIQUE INDEX "projects_blocks_gallery_images_locales_locale_parent_id_uniq" ON "projects_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_gallery_images_locales_parent_id_idx" ON "projects_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_order_idx" ON "projects_blocks_gallery" USING btree ("_order");
  CREATE INDEX "projects_blocks_gallery_parent_id_idx" ON "projects_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_gallery_path_idx" ON "projects_blocks_gallery" USING btree ("_path");
  CREATE INDEX "projects_blocks_quote_order_idx" ON "projects_blocks_quote" USING btree ("_order");
  CREATE INDEX "projects_blocks_quote_parent_id_idx" ON "projects_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_quote_path_idx" ON "projects_blocks_quote" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_quote_locales_locale_parent_id_unique" ON "projects_blocks_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_quote_locales_parent_id_idx" ON "projects_blocks_quote_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_callout_order_idx" ON "projects_blocks_callout" USING btree ("_order");
  CREATE INDEX "projects_blocks_callout_parent_id_idx" ON "projects_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_callout_path_idx" ON "projects_blocks_callout" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_callout_locales_locale_parent_id_unique" ON "projects_blocks_callout_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_callout_locales_parent_id_idx" ON "projects_blocks_callout_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_key_points_items_order_idx" ON "projects_blocks_key_points_items" USING btree ("_order");
  CREATE INDEX "projects_blocks_key_points_items_parent_id_idx" ON "projects_blocks_key_points_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_blocks_key_points_items_locales_locale_parent_id_un" ON "projects_blocks_key_points_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_key_points_items_locales_parent_id_idx" ON "projects_blocks_key_points_items_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_key_points_order_idx" ON "projects_blocks_key_points" USING btree ("_order");
  CREATE INDEX "projects_blocks_key_points_parent_id_idx" ON "projects_blocks_key_points" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_key_points_path_idx" ON "projects_blocks_key_points" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_key_points_locales_locale_parent_id_unique" ON "projects_blocks_key_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_key_points_locales_parent_id_idx" ON "projects_blocks_key_points_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_prototype_order_idx" ON "projects_blocks_prototype" USING btree ("_order");
  CREATE INDEX "projects_blocks_prototype_parent_id_idx" ON "projects_blocks_prototype" USING btree ("_parent_id");
  CREATE INDEX "projects_blocks_prototype_path_idx" ON "projects_blocks_prototype" USING btree ("_path");
  CREATE UNIQUE INDEX "projects_blocks_prototype_locales_locale_parent_id_unique" ON "projects_blocks_prototype_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_blocks_prototype_locales_parent_id_idx" ON "projects_blocks_prototype_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_links_order_idx" ON "projects_links" USING btree ("_order");
  CREATE INDEX "projects_links_parent_id_idx" ON "projects_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_links_locales_locale_parent_id_unique" ON "projects_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_links_locales_parent_id_idx" ON "projects_links_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_cover_idx" ON "projects" USING btree ("cover_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_locales_parent_id_idx" ON "projects_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_text_section_order_idx" ON "_projects_v_blocks_text_section" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_text_section_parent_id_idx" ON "_projects_v_blocks_text_section" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_text_section_path_idx" ON "_projects_v_blocks_text_section" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_text_section_locales_locale_parent_id_uni" ON "_projects_v_blocks_text_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_text_section_locales_parent_id_idx" ON "_projects_v_blocks_text_section_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_image_order_idx" ON "_projects_v_blocks_image" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_image_parent_id_idx" ON "_projects_v_blocks_image" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_image_path_idx" ON "_projects_v_blocks_image" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_image_media_idx" ON "_projects_v_blocks_image" USING btree ("media_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_image_locales_locale_parent_id_unique" ON "_projects_v_blocks_image_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_image_locales_parent_id_idx" ON "_projects_v_blocks_image_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_images_order_idx" ON "_projects_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_images_parent_id_idx" ON "_projects_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_images_media_idx" ON "_projects_v_blocks_gallery_images" USING btree ("media_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_gallery_images_locales_locale_parent_id_u" ON "_projects_v_blocks_gallery_images_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_images_locales_parent_id_idx" ON "_projects_v_blocks_gallery_images_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_order_idx" ON "_projects_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_gallery_parent_id_idx" ON "_projects_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_gallery_path_idx" ON "_projects_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_projects_v_blocks_quote_order_idx" ON "_projects_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_quote_parent_id_idx" ON "_projects_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_quote_path_idx" ON "_projects_v_blocks_quote" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_quote_locales_locale_parent_id_unique" ON "_projects_v_blocks_quote_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_quote_locales_parent_id_idx" ON "_projects_v_blocks_quote_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_callout_order_idx" ON "_projects_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_callout_parent_id_idx" ON "_projects_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_callout_path_idx" ON "_projects_v_blocks_callout" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_callout_locales_locale_parent_id_unique" ON "_projects_v_blocks_callout_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_callout_locales_parent_id_idx" ON "_projects_v_blocks_callout_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_key_points_items_order_idx" ON "_projects_v_blocks_key_points_items" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_key_points_items_parent_id_idx" ON "_projects_v_blocks_key_points_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_blocks_key_points_items_locales_locale_parent_id" ON "_projects_v_blocks_key_points_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_key_points_items_locales_parent_id_idx" ON "_projects_v_blocks_key_points_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_key_points_order_idx" ON "_projects_v_blocks_key_points" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_key_points_parent_id_idx" ON "_projects_v_blocks_key_points" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_key_points_path_idx" ON "_projects_v_blocks_key_points" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_key_points_locales_locale_parent_id_uniqu" ON "_projects_v_blocks_key_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_key_points_locales_parent_id_idx" ON "_projects_v_blocks_key_points_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_prototype_order_idx" ON "_projects_v_blocks_prototype" USING btree ("_order");
  CREATE INDEX "_projects_v_blocks_prototype_parent_id_idx" ON "_projects_v_blocks_prototype" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_blocks_prototype_path_idx" ON "_projects_v_blocks_prototype" USING btree ("_path");
  CREATE UNIQUE INDEX "_projects_v_blocks_prototype_locales_locale_parent_id_unique" ON "_projects_v_blocks_prototype_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_blocks_prototype_locales_parent_id_idx" ON "_projects_v_blocks_prototype_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_links_order_idx" ON "_projects_v_version_links" USING btree ("_order");
  CREATE INDEX "_projects_v_version_links_parent_id_idx" ON "_projects_v_version_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_links_locales_locale_parent_id_unique" ON "_projects_v_version_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_links_locales_parent_id_idx" ON "_projects_v_version_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_cover_idx" ON "_projects_v" USING btree ("version_cover_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_locales_parent_id_idx" ON "_projects_v_locales" USING btree ("_parent_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_locales_parent_id_idx" ON "services_locales" USING btree ("_parent_id");
  CREATE INDEX "experiences_updated_at_idx" ON "experiences" USING btree ("updated_at");
  CREATE INDEX "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
  CREATE UNIQUE INDEX "experiences_locales_locale_parent_id_unique" ON "experiences_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiences_locales_parent_id_idx" ON "experiences_locales" USING btree ("_parent_id");
  CREATE INDEX "education_updated_at_idx" ON "education" USING btree ("updated_at");
  CREATE INDEX "education_created_at_idx" ON "education" USING btree ("created_at");
  CREATE UNIQUE INDEX "education_locales_locale_parent_id_unique" ON "education_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "education_locales_parent_id_idx" ON "education_locales" USING btree ("_parent_id");
  CREATE INDEX "certifications_updated_at_idx" ON "certifications" USING btree ("updated_at");
  CREATE INDEX "certifications_created_at_idx" ON "certifications" USING btree ("created_at");
  CREATE UNIQUE INDEX "certifications_locales_locale_parent_id_unique" ON "certifications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "certifications_locales_parent_id_idx" ON "certifications_locales" USING btree ("_parent_id");
  CREATE INDEX "tools_updated_at_idx" ON "tools" USING btree ("updated_at");
  CREATE INDEX "tools_created_at_idx" ON "tools" USING btree ("created_at");
  CREATE UNIQUE INDEX "legal_pages_slug_idx" ON "legal_pages" USING btree ("slug");
  CREATE INDEX "legal_pages_updated_at_idx" ON "legal_pages" USING btree ("updated_at");
  CREATE INDEX "legal_pages_created_at_idx" ON "legal_pages" USING btree ("created_at");
  CREATE UNIQUE INDEX "legal_pages_locales_locale_parent_id_unique" ON "legal_pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "legal_pages_locales_parent_id_idx" ON "legal_pages_locales" USING btree ("_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "messages_updated_at_idx" ON "messages" USING btree ("updated_at");
  CREATE INDEX "messages_created_at_idx" ON "messages" USING btree ("created_at");
  CREATE INDEX "analytics_events_type_idx" ON "analytics_events" USING btree ("type");
  CREATE INDEX "analytics_events_path_idx" ON "analytics_events" USING btree ("path");
  CREATE INDEX "analytics_events_visitor_idx" ON "analytics_events" USING btree ("visitor");
  CREATE INDEX "analytics_events_updated_at_idx" ON "analytics_events" USING btree ("updated_at");
  CREATE INDEX "analytics_events_created_at_idx" ON "analytics_events" USING btree ("created_at");
  CREATE INDEX "createdAt_type_idx" ON "analytics_events" USING btree ("created_at","type");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("experiences_id");
  CREATE INDEX "payload_locked_documents_rels_education_id_idx" ON "payload_locked_documents_rels" USING btree ("education_id");
  CREATE INDEX "payload_locked_documents_rels_certifications_id_idx" ON "payload_locked_documents_rels" USING btree ("certifications_id");
  CREATE INDEX "payload_locked_documents_rels_tools_id_idx" ON "payload_locked_documents_rels" USING btree ("tools_id");
  CREATE INDEX "payload_locked_documents_rels_legal_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("legal_pages_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_messages_id_idx" ON "payload_locked_documents_rels" USING btree ("messages_id");
  CREATE INDEX "payload_locked_documents_rels_analytics_events_id_idx" ON "payload_locked_documents_rels" USING btree ("analytics_events_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "home_page_blocks_hero_badges_order_idx" ON "home_page_blocks_hero_badges" USING btree ("_order");
  CREATE INDEX "home_page_blocks_hero_badges_parent_id_idx" ON "home_page_blocks_hero_badges" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_blocks_hero_badges_locales_locale_parent_id_unique" ON "home_page_blocks_hero_badges_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_hero_badges_locales_parent_id_idx" ON "home_page_blocks_hero_badges_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_hero_cursors_order_idx" ON "home_page_blocks_hero_cursors" USING btree ("_order");
  CREATE INDEX "home_page_blocks_hero_cursors_parent_id_idx" ON "home_page_blocks_hero_cursors" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_blocks_hero_cursors_locales_locale_parent_id_uniqu" ON "home_page_blocks_hero_cursors_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_hero_cursors_locales_parent_id_idx" ON "home_page_blocks_hero_cursors_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_hero_order_idx" ON "home_page_blocks_hero" USING btree ("_order");
  CREATE INDEX "home_page_blocks_hero_parent_id_idx" ON "home_page_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_hero_path_idx" ON "home_page_blocks_hero" USING btree ("_path");
  CREATE INDEX "home_page_blocks_hero_portrait_idx" ON "home_page_blocks_hero" USING btree ("portrait_id");
  CREATE UNIQUE INDEX "home_page_blocks_hero_locales_locale_parent_id_unique" ON "home_page_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_hero_locales_parent_id_idx" ON "home_page_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_marquee_items_order_idx" ON "home_page_blocks_marquee_items" USING btree ("_order");
  CREATE INDEX "home_page_blocks_marquee_items_parent_id_idx" ON "home_page_blocks_marquee_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_blocks_marquee_items_locales_locale_parent_id_uniq" ON "home_page_blocks_marquee_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_marquee_items_locales_parent_id_idx" ON "home_page_blocks_marquee_items_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_marquee_order_idx" ON "home_page_blocks_marquee" USING btree ("_order");
  CREATE INDEX "home_page_blocks_marquee_parent_id_idx" ON "home_page_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_marquee_path_idx" ON "home_page_blocks_marquee" USING btree ("_path");
  CREATE INDEX "home_page_blocks_services_order_idx" ON "home_page_blocks_services" USING btree ("_order");
  CREATE INDEX "home_page_blocks_services_parent_id_idx" ON "home_page_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_services_path_idx" ON "home_page_blocks_services" USING btree ("_path");
  CREATE UNIQUE INDEX "home_page_blocks_services_locales_locale_parent_id_unique" ON "home_page_blocks_services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_services_locales_parent_id_idx" ON "home_page_blocks_services_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_projects_order_idx" ON "home_page_blocks_projects" USING btree ("_order");
  CREATE INDEX "home_page_blocks_projects_parent_id_idx" ON "home_page_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_projects_path_idx" ON "home_page_blocks_projects" USING btree ("_path");
  CREATE UNIQUE INDEX "home_page_blocks_projects_locales_locale_parent_id_unique" ON "home_page_blocks_projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_projects_locales_parent_id_idx" ON "home_page_blocks_projects_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_about_chips_order_idx" ON "home_page_blocks_about_chips" USING btree ("_order");
  CREATE INDEX "home_page_blocks_about_chips_parent_id_idx" ON "home_page_blocks_about_chips" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_blocks_about_chips_locales_locale_parent_id_unique" ON "home_page_blocks_about_chips_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_about_chips_locales_parent_id_idx" ON "home_page_blocks_about_chips_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_about_facts_order_idx" ON "home_page_blocks_about_facts" USING btree ("_order");
  CREATE INDEX "home_page_blocks_about_facts_parent_id_idx" ON "home_page_blocks_about_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "home_page_blocks_about_facts_locales_locale_parent_id_unique" ON "home_page_blocks_about_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_about_facts_locales_parent_id_idx" ON "home_page_blocks_about_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_about_order_idx" ON "home_page_blocks_about" USING btree ("_order");
  CREATE INDEX "home_page_blocks_about_parent_id_idx" ON "home_page_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_about_path_idx" ON "home_page_blocks_about" USING btree ("_path");
  CREATE INDEX "home_page_blocks_about_photo_idx" ON "home_page_blocks_about" USING btree ("photo_id");
  CREATE UNIQUE INDEX "home_page_blocks_about_locales_locale_parent_id_unique" ON "home_page_blocks_about_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_about_locales_parent_id_idx" ON "home_page_blocks_about_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_tools_order_idx" ON "home_page_blocks_tools" USING btree ("_order");
  CREATE INDEX "home_page_blocks_tools_parent_id_idx" ON "home_page_blocks_tools" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_tools_path_idx" ON "home_page_blocks_tools" USING btree ("_path");
  CREATE UNIQUE INDEX "home_page_blocks_tools_locales_locale_parent_id_unique" ON "home_page_blocks_tools_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_tools_locales_parent_id_idx" ON "home_page_blocks_tools_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_contact_cta_order_idx" ON "home_page_blocks_contact_cta" USING btree ("_order");
  CREATE INDEX "home_page_blocks_contact_cta_parent_id_idx" ON "home_page_blocks_contact_cta" USING btree ("_parent_id");
  CREATE INDEX "home_page_blocks_contact_cta_path_idx" ON "home_page_blocks_contact_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "home_page_blocks_contact_cta_locales_locale_parent_id_unique" ON "home_page_blocks_contact_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_page_blocks_contact_cta_locales_parent_id_idx" ON "home_page_blocks_contact_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "home_page__status_idx" ON "home_page" USING btree ("_status");
  CREATE INDEX "_home_page_v_blocks_hero_badges_order_idx" ON "_home_page_v_blocks_hero_badges" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_hero_badges_parent_id_idx" ON "_home_page_v_blocks_hero_badges" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_blocks_hero_badges_locales_locale_parent_id_uni" ON "_home_page_v_blocks_hero_badges_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_blocks_hero_badges_locales_parent_id_idx" ON "_home_page_v_blocks_hero_badges_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_hero_cursors_order_idx" ON "_home_page_v_blocks_hero_cursors" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_hero_cursors_parent_id_idx" ON "_home_page_v_blocks_hero_cursors" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_blocks_hero_cursors_locales_locale_parent_id_un" ON "_home_page_v_blocks_hero_cursors_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_blocks_hero_cursors_locales_parent_id_idx" ON "_home_page_v_blocks_hero_cursors_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_hero_order_idx" ON "_home_page_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_hero_parent_id_idx" ON "_home_page_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_hero_path_idx" ON "_home_page_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_hero_portrait_idx" ON "_home_page_v_blocks_hero" USING btree ("portrait_id");
  CREATE UNIQUE INDEX "_home_page_v_blocks_hero_locales_locale_parent_id_unique" ON "_home_page_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_blocks_hero_locales_parent_id_idx" ON "_home_page_v_blocks_hero_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_marquee_items_order_idx" ON "_home_page_v_blocks_marquee_items" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_marquee_items_parent_id_idx" ON "_home_page_v_blocks_marquee_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_blocks_marquee_items_locales_locale_parent_id_u" ON "_home_page_v_blocks_marquee_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_blocks_marquee_items_locales_parent_id_idx" ON "_home_page_v_blocks_marquee_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_marquee_order_idx" ON "_home_page_v_blocks_marquee" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_marquee_parent_id_idx" ON "_home_page_v_blocks_marquee" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_marquee_path_idx" ON "_home_page_v_blocks_marquee" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_services_order_idx" ON "_home_page_v_blocks_services" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_services_parent_id_idx" ON "_home_page_v_blocks_services" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_services_path_idx" ON "_home_page_v_blocks_services" USING btree ("_path");
  CREATE UNIQUE INDEX "_home_page_v_blocks_services_locales_locale_parent_id_unique" ON "_home_page_v_blocks_services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_blocks_services_locales_parent_id_idx" ON "_home_page_v_blocks_services_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_projects_order_idx" ON "_home_page_v_blocks_projects" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_projects_parent_id_idx" ON "_home_page_v_blocks_projects" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_projects_path_idx" ON "_home_page_v_blocks_projects" USING btree ("_path");
  CREATE UNIQUE INDEX "_home_page_v_blocks_projects_locales_locale_parent_id_unique" ON "_home_page_v_blocks_projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_blocks_projects_locales_parent_id_idx" ON "_home_page_v_blocks_projects_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_about_chips_order_idx" ON "_home_page_v_blocks_about_chips" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_about_chips_parent_id_idx" ON "_home_page_v_blocks_about_chips" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_blocks_about_chips_locales_locale_parent_id_uni" ON "_home_page_v_blocks_about_chips_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_blocks_about_chips_locales_parent_id_idx" ON "_home_page_v_blocks_about_chips_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_about_facts_order_idx" ON "_home_page_v_blocks_about_facts" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_about_facts_parent_id_idx" ON "_home_page_v_blocks_about_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_home_page_v_blocks_about_facts_locales_locale_parent_id_uni" ON "_home_page_v_blocks_about_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_blocks_about_facts_locales_parent_id_idx" ON "_home_page_v_blocks_about_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_about_order_idx" ON "_home_page_v_blocks_about" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_about_parent_id_idx" ON "_home_page_v_blocks_about" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_about_path_idx" ON "_home_page_v_blocks_about" USING btree ("_path");
  CREATE INDEX "_home_page_v_blocks_about_photo_idx" ON "_home_page_v_blocks_about" USING btree ("photo_id");
  CREATE UNIQUE INDEX "_home_page_v_blocks_about_locales_locale_parent_id_unique" ON "_home_page_v_blocks_about_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_blocks_about_locales_parent_id_idx" ON "_home_page_v_blocks_about_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_tools_order_idx" ON "_home_page_v_blocks_tools" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_tools_parent_id_idx" ON "_home_page_v_blocks_tools" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_tools_path_idx" ON "_home_page_v_blocks_tools" USING btree ("_path");
  CREATE UNIQUE INDEX "_home_page_v_blocks_tools_locales_locale_parent_id_unique" ON "_home_page_v_blocks_tools_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_blocks_tools_locales_parent_id_idx" ON "_home_page_v_blocks_tools_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_contact_cta_order_idx" ON "_home_page_v_blocks_contact_cta" USING btree ("_order");
  CREATE INDEX "_home_page_v_blocks_contact_cta_parent_id_idx" ON "_home_page_v_blocks_contact_cta" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_blocks_contact_cta_path_idx" ON "_home_page_v_blocks_contact_cta" USING btree ("_path");
  CREATE UNIQUE INDEX "_home_page_v_blocks_contact_cta_locales_locale_parent_id_uni" ON "_home_page_v_blocks_contact_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_home_page_v_blocks_contact_cta_locales_parent_id_idx" ON "_home_page_v_blocks_contact_cta_locales" USING btree ("_parent_id");
  CREATE INDEX "_home_page_v_version_version__status_idx" ON "_home_page_v" USING btree ("version__status");
  CREATE INDEX "_home_page_v_created_at_idx" ON "_home_page_v" USING btree ("created_at");
  CREATE INDEX "_home_page_v_updated_at_idx" ON "_home_page_v" USING btree ("updated_at");
  CREATE INDEX "_home_page_v_snapshot_idx" ON "_home_page_v" USING btree ("snapshot");
  CREATE INDEX "_home_page_v_published_locale_idx" ON "_home_page_v" USING btree ("published_locale");
  CREATE INDEX "_home_page_v_latest_idx" ON "_home_page_v" USING btree ("latest");
  CREATE INDEX "pages_content_services_process_steps_order_idx" ON "pages_content_services_process_steps" USING btree ("_order");
  CREATE INDEX "pages_content_services_process_steps_parent_id_idx" ON "pages_content_services_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_content_services_process_steps_locales_locale_parent_i" ON "pages_content_services_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_content_services_process_steps_locales_parent_id_idx" ON "pages_content_services_process_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_content_about_values_order_idx" ON "pages_content_about_values" USING btree ("_order");
  CREATE INDEX "pages_content_about_values_parent_id_idx" ON "pages_content_about_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_content_about_values_locales_locale_parent_id_unique" ON "pages_content_about_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_content_about_values_locales_parent_id_idx" ON "pages_content_about_values_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_content_about_languages_order_idx" ON "pages_content_about_languages" USING btree ("_order");
  CREATE INDEX "pages_content_about_languages_parent_id_idx" ON "pages_content_about_languages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_content_about_languages_locales_locale_parent_id_uniqu" ON "pages_content_about_languages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_content_about_languages_locales_parent_id_idx" ON "pages_content_about_languages_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_content_about_about_photo_idx" ON "pages_content" USING btree ("about_photo_id");
  CREATE UNIQUE INDEX "pages_content_locales_locale_parent_id_unique" ON "pages_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_content_locales_parent_id_idx" ON "pages_content_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_content_v_version_services_process_steps_order_idx" ON "_pages_content_v_version_services_process_steps" USING btree ("_order");
  CREATE INDEX "_pages_content_v_version_services_process_steps_parent_id_idx" ON "_pages_content_v_version_services_process_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_content_v_version_services_process_steps_locales_loca" ON "_pages_content_v_version_services_process_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_content_v_version_services_process_steps_locales__idx" ON "_pages_content_v_version_services_process_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_content_v_version_about_values_order_idx" ON "_pages_content_v_version_about_values" USING btree ("_order");
  CREATE INDEX "_pages_content_v_version_about_values_parent_id_idx" ON "_pages_content_v_version_about_values" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_content_v_version_about_values_locales_locale_parent_" ON "_pages_content_v_version_about_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_content_v_version_about_values_locales_parent_id_idx" ON "_pages_content_v_version_about_values_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_content_v_version_about_languages_order_idx" ON "_pages_content_v_version_about_languages" USING btree ("_order");
  CREATE INDEX "_pages_content_v_version_about_languages_parent_id_idx" ON "_pages_content_v_version_about_languages" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_content_v_version_about_languages_locales_locale_pare" ON "_pages_content_v_version_about_languages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_content_v_version_about_languages_locales_parent__idx" ON "_pages_content_v_version_about_languages_locales" USING btree ("_parent_id");
  CREATE INDEX "_pages_content_v_version_about_version_about_photo_idx" ON "_pages_content_v" USING btree ("version_about_photo_id");
  CREATE INDEX "_pages_content_v_created_at_idx" ON "_pages_content_v" USING btree ("created_at");
  CREATE INDEX "_pages_content_v_updated_at_idx" ON "_pages_content_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_pages_content_v_locales_locale_parent_id_unique" ON "_pages_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_content_v_locales_parent_id_idx" ON "_pages_content_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_theme_v_created_at_idx" ON "_theme_v" USING btree ("created_at");
  CREATE INDEX "_theme_v_updated_at_idx" ON "_theme_v" USING btree ("updated_at");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_nav_items_order_idx" ON "site_settings_nav_items" USING btree ("_order");
  CREATE INDEX "site_settings_nav_items_parent_id_idx" ON "site_settings_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_nav_items_locales_locale_parent_id_unique" ON "site_settings_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_nav_items_locales_parent_id_idx" ON "site_settings_nav_items_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_footer_links_order_idx" ON "site_settings_footer_links" USING btree ("_order");
  CREATE INDEX "site_settings_footer_links_parent_id_idx" ON "site_settings_footer_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_footer_links_locales_locale_parent_id_unique" ON "site_settings_footer_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_footer_links_locales_parent_id_idx" ON "site_settings_footer_links_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_opportunity_types_order_idx" ON "site_settings_opportunity_types" USING btree ("_order");
  CREATE INDEX "site_settings_opportunity_types_parent_id_idx" ON "site_settings_opportunity_types" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "site_settings_opportunity_types_locales_locale_parent_id_uni" ON "site_settings_opportunity_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_opportunity_types_locales_parent_id_idx" ON "site_settings_opportunity_types_locales" USING btree ("_parent_id");
  CREATE INDEX "site_settings_cv_fr_idx" ON "site_settings" USING btree ("cv_fr_id");
  CREATE INDEX "site_settings_cv_en_idx" ON "site_settings" USING btree ("cv_en_id");
  CREATE INDEX "site_settings_share_image_idx" ON "site_settings" USING btree ("share_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "site_settings_locales_parent_id_idx" ON "site_settings_locales" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_social_links_order_idx" ON "_site_settings_v_version_social_links" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_social_links_parent_id_idx" ON "_site_settings_v_version_social_links" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_nav_items_order_idx" ON "_site_settings_v_version_nav_items" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_nav_items_parent_id_idx" ON "_site_settings_v_version_nav_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_settings_v_version_nav_items_locales_locale_parent_id_" ON "_site_settings_v_version_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_nav_items_locales_parent_id_idx" ON "_site_settings_v_version_nav_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_footer_links_order_idx" ON "_site_settings_v_version_footer_links" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_footer_links_parent_id_idx" ON "_site_settings_v_version_footer_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_settings_v_version_footer_links_locales_locale_parent_" ON "_site_settings_v_version_footer_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_footer_links_locales_parent_id_idx" ON "_site_settings_v_version_footer_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_opportunity_types_order_idx" ON "_site_settings_v_version_opportunity_types" USING btree ("_order");
  CREATE INDEX "_site_settings_v_version_opportunity_types_parent_id_idx" ON "_site_settings_v_version_opportunity_types" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_site_settings_v_version_opportunity_types_locales_locale_pa" ON "_site_settings_v_version_opportunity_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_version_opportunity_types_locales_paren_idx" ON "_site_settings_v_version_opportunity_types_locales" USING btree ("_parent_id");
  CREATE INDEX "_site_settings_v_version_version_cv_fr_idx" ON "_site_settings_v" USING btree ("version_cv_fr_id");
  CREATE INDEX "_site_settings_v_version_version_cv_en_idx" ON "_site_settings_v" USING btree ("version_cv_en_id");
  CREATE INDEX "_site_settings_v_version_version_share_image_idx" ON "_site_settings_v" USING btree ("version_share_image_id");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_site_settings_v_locales_locale_parent_id_unique" ON "_site_settings_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_site_settings_v_locales_parent_id_idx" ON "_site_settings_v_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "projects_blocks_text_section" CASCADE;
  DROP TABLE "projects_blocks_text_section_locales" CASCADE;
  DROP TABLE "projects_blocks_image" CASCADE;
  DROP TABLE "projects_blocks_image_locales" CASCADE;
  DROP TABLE "projects_blocks_gallery_images" CASCADE;
  DROP TABLE "projects_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "projects_blocks_gallery" CASCADE;
  DROP TABLE "projects_blocks_quote" CASCADE;
  DROP TABLE "projects_blocks_quote_locales" CASCADE;
  DROP TABLE "projects_blocks_callout" CASCADE;
  DROP TABLE "projects_blocks_callout_locales" CASCADE;
  DROP TABLE "projects_blocks_key_points_items" CASCADE;
  DROP TABLE "projects_blocks_key_points_items_locales" CASCADE;
  DROP TABLE "projects_blocks_key_points" CASCADE;
  DROP TABLE "projects_blocks_key_points_locales" CASCADE;
  DROP TABLE "projects_blocks_prototype" CASCADE;
  DROP TABLE "projects_blocks_prototype_locales" CASCADE;
  DROP TABLE "projects_links" CASCADE;
  DROP TABLE "projects_links_locales" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_text_section" CASCADE;
  DROP TABLE "_projects_v_blocks_text_section_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_image" CASCADE;
  DROP TABLE "_projects_v_blocks_image_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery_images_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_gallery" CASCADE;
  DROP TABLE "_projects_v_blocks_quote" CASCADE;
  DROP TABLE "_projects_v_blocks_quote_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_callout" CASCADE;
  DROP TABLE "_projects_v_blocks_callout_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_key_points_items" CASCADE;
  DROP TABLE "_projects_v_blocks_key_points_items_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_key_points" CASCADE;
  DROP TABLE "_projects_v_blocks_key_points_locales" CASCADE;
  DROP TABLE "_projects_v_blocks_prototype" CASCADE;
  DROP TABLE "_projects_v_blocks_prototype_locales" CASCADE;
  DROP TABLE "_projects_v_version_links" CASCADE;
  DROP TABLE "_projects_v_version_links_locales" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "experiences" CASCADE;
  DROP TABLE "experiences_locales" CASCADE;
  DROP TABLE "education" CASCADE;
  DROP TABLE "education_locales" CASCADE;
  DROP TABLE "certifications" CASCADE;
  DROP TABLE "certifications_locales" CASCADE;
  DROP TABLE "tools" CASCADE;
  DROP TABLE "legal_pages" CASCADE;
  DROP TABLE "legal_pages_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "messages" CASCADE;
  DROP TABLE "analytics_events" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "home_page_blocks_hero_badges" CASCADE;
  DROP TABLE "home_page_blocks_hero_badges_locales" CASCADE;
  DROP TABLE "home_page_blocks_hero_cursors" CASCADE;
  DROP TABLE "home_page_blocks_hero_cursors_locales" CASCADE;
  DROP TABLE "home_page_blocks_hero" CASCADE;
  DROP TABLE "home_page_blocks_hero_locales" CASCADE;
  DROP TABLE "home_page_blocks_marquee_items" CASCADE;
  DROP TABLE "home_page_blocks_marquee_items_locales" CASCADE;
  DROP TABLE "home_page_blocks_marquee" CASCADE;
  DROP TABLE "home_page_blocks_services" CASCADE;
  DROP TABLE "home_page_blocks_services_locales" CASCADE;
  DROP TABLE "home_page_blocks_projects" CASCADE;
  DROP TABLE "home_page_blocks_projects_locales" CASCADE;
  DROP TABLE "home_page_blocks_about_chips" CASCADE;
  DROP TABLE "home_page_blocks_about_chips_locales" CASCADE;
  DROP TABLE "home_page_blocks_about_facts" CASCADE;
  DROP TABLE "home_page_blocks_about_facts_locales" CASCADE;
  DROP TABLE "home_page_blocks_about" CASCADE;
  DROP TABLE "home_page_blocks_about_locales" CASCADE;
  DROP TABLE "home_page_blocks_tools" CASCADE;
  DROP TABLE "home_page_blocks_tools_locales" CASCADE;
  DROP TABLE "home_page_blocks_contact_cta" CASCADE;
  DROP TABLE "home_page_blocks_contact_cta_locales" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TABLE "_home_page_v_blocks_hero_badges" CASCADE;
  DROP TABLE "_home_page_v_blocks_hero_badges_locales" CASCADE;
  DROP TABLE "_home_page_v_blocks_hero_cursors" CASCADE;
  DROP TABLE "_home_page_v_blocks_hero_cursors_locales" CASCADE;
  DROP TABLE "_home_page_v_blocks_hero" CASCADE;
  DROP TABLE "_home_page_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_home_page_v_blocks_marquee_items" CASCADE;
  DROP TABLE "_home_page_v_blocks_marquee_items_locales" CASCADE;
  DROP TABLE "_home_page_v_blocks_marquee" CASCADE;
  DROP TABLE "_home_page_v_blocks_services" CASCADE;
  DROP TABLE "_home_page_v_blocks_services_locales" CASCADE;
  DROP TABLE "_home_page_v_blocks_projects" CASCADE;
  DROP TABLE "_home_page_v_blocks_projects_locales" CASCADE;
  DROP TABLE "_home_page_v_blocks_about_chips" CASCADE;
  DROP TABLE "_home_page_v_blocks_about_chips_locales" CASCADE;
  DROP TABLE "_home_page_v_blocks_about_facts" CASCADE;
  DROP TABLE "_home_page_v_blocks_about_facts_locales" CASCADE;
  DROP TABLE "_home_page_v_blocks_about" CASCADE;
  DROP TABLE "_home_page_v_blocks_about_locales" CASCADE;
  DROP TABLE "_home_page_v_blocks_tools" CASCADE;
  DROP TABLE "_home_page_v_blocks_tools_locales" CASCADE;
  DROP TABLE "_home_page_v_blocks_contact_cta" CASCADE;
  DROP TABLE "_home_page_v_blocks_contact_cta_locales" CASCADE;
  DROP TABLE "_home_page_v" CASCADE;
  DROP TABLE "pages_content_services_process_steps" CASCADE;
  DROP TABLE "pages_content_services_process_steps_locales" CASCADE;
  DROP TABLE "pages_content_about_values" CASCADE;
  DROP TABLE "pages_content_about_values_locales" CASCADE;
  DROP TABLE "pages_content_about_languages" CASCADE;
  DROP TABLE "pages_content_about_languages_locales" CASCADE;
  DROP TABLE "pages_content" CASCADE;
  DROP TABLE "pages_content_locales" CASCADE;
  DROP TABLE "_pages_content_v_version_services_process_steps" CASCADE;
  DROP TABLE "_pages_content_v_version_services_process_steps_locales" CASCADE;
  DROP TABLE "_pages_content_v_version_about_values" CASCADE;
  DROP TABLE "_pages_content_v_version_about_values_locales" CASCADE;
  DROP TABLE "_pages_content_v_version_about_languages" CASCADE;
  DROP TABLE "_pages_content_v_version_about_languages_locales" CASCADE;
  DROP TABLE "_pages_content_v" CASCADE;
  DROP TABLE "_pages_content_v_locales" CASCADE;
  DROP TABLE "theme" CASCADE;
  DROP TABLE "_theme_v" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings_nav_items" CASCADE;
  DROP TABLE "site_settings_nav_items_locales" CASCADE;
  DROP TABLE "site_settings_footer_links" CASCADE;
  DROP TABLE "site_settings_footer_links_locales" CASCADE;
  DROP TABLE "site_settings_opportunity_types" CASCADE;
  DROP TABLE "site_settings_opportunity_types_locales" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TABLE "_site_settings_v_version_social_links" CASCADE;
  DROP TABLE "_site_settings_v_version_nav_items" CASCADE;
  DROP TABLE "_site_settings_v_version_nav_items_locales" CASCADE;
  DROP TABLE "_site_settings_v_version_footer_links" CASCADE;
  DROP TABLE "_site_settings_v_version_footer_links_locales" CASCADE;
  DROP TABLE "_site_settings_v_version_opportunity_types" CASCADE;
  DROP TABLE "_site_settings_v_version_opportunity_types_locales" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "_site_settings_v_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_projects_blocks_image_size";
  DROP TYPE "public"."enum_projects_blocks_callout_kind";
  DROP TYPE "public"."enum_projects_blocks_prototype_format";
  DROP TYPE "public"."enum_projects_discipline";
  DROP TYPE "public"."enum_projects_cover_tone";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_blocks_image_size";
  DROP TYPE "public"."enum__projects_v_blocks_callout_kind";
  DROP TYPE "public"."enum__projects_v_blocks_prototype_format";
  DROP TYPE "public"."enum__projects_v_version_discipline";
  DROP TYPE "public"."enum__projects_v_version_cover_tone";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_services_icon";
  DROP TYPE "public"."enum_tools_group";
  DROP TYPE "public"."enum_messages_status";
  DROP TYPE "public"."enum_analytics_events_type";
  DROP TYPE "public"."enum_home_page_blocks_hero_cursors_kind";
  DROP TYPE "public"."enum_home_page_blocks_hero_cursors_tone";
  DROP TYPE "public"."enum_home_page_blocks_hero_secondary_cta_action";
  DROP TYPE "public"."enum_home_page_blocks_marquee_speed";
  DROP TYPE "public"."enum_home_page_blocks_about_chips_tone";
  DROP TYPE "public"."enum_home_page_status";
  DROP TYPE "public"."enum__home_page_v_blocks_hero_cursors_kind";
  DROP TYPE "public"."enum__home_page_v_blocks_hero_cursors_tone";
  DROP TYPE "public"."enum__home_page_v_blocks_hero_secondary_cta_action";
  DROP TYPE "public"."enum__home_page_v_blocks_marquee_speed";
  DROP TYPE "public"."enum__home_page_v_blocks_about_chips_tone";
  DROP TYPE "public"."enum__home_page_v_version_status";
  DROP TYPE "public"."enum__home_page_v_published_locale";
  DROP TYPE "public"."enum_theme_typography_heading_font";
  DROP TYPE "public"."enum_theme_typography_body_font";
  DROP TYPE "public"."enum_theme_typography_script_font";
  DROP TYPE "public"."enum_theme_shape_button_style";
  DROP TYPE "public"."enum__theme_v_version_typography_heading_font";
  DROP TYPE "public"."enum__theme_v_version_typography_body_font";
  DROP TYPE "public"."enum__theme_v_version_typography_script_font";
  DROP TYPE "public"."enum__theme_v_version_shape_button_style";
  DROP TYPE "public"."enum_site_settings_availability";
  DROP TYPE "public"."enum_site_settings_work_mode";
  DROP TYPE "public"."enum_site_settings_animations";
  DROP TYPE "public"."enum__site_settings_v_version_availability";
  DROP TYPE "public"."enum__site_settings_v_version_work_mode";
  DROP TYPE "public"."enum__site_settings_v_version_animations";`)
}
