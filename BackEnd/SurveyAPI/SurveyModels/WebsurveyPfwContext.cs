using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SurveyAPI.SurveyModels;

public partial class WebsurveyPfwContext : DbContext
{
    public WebsurveyPfwContext()
    {
    }

    public WebsurveyPfwContext(DbContextOptions<WebsurveyPfwContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Option> Options { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<Questiontype> Questiontypes { get; set; }

    public virtual DbSet<Researcher> Researchers { get; set; }

    public virtual DbSet<Survey> Surveys { get; set; }

    public virtual DbSet<SurveyQuestion> SurveyQuestions { get; set; }
    public virtual DbSet<SurveyResponse> SurveyResponses { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_general_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Option>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("options");

            entity.HasIndex(e => e.QuestionId, "FK_optionsQuestions");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.QuestionId)
                .HasColumnType("int(11)")
                .HasColumnName("questionId");

            entity.HasOne(d => d.Question).WithMany(p => p.Options)
                .HasForeignKey(d => d.QuestionId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_optionsQuestions");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("question");

            entity.HasIndex(e => e.Type, "FK_questionType");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(255)
                .HasColumnName("createdBy");
            entity.Property(e => e.DateCreated).HasColumnName("date_created");
            entity.Property(e => e.DateModified).HasColumnName("date_modified");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.IsRequired)
                .HasDefaultValueSql("b'0'")
                .HasColumnType("bit(1)")
                .HasColumnName("isRequired");
            entity.Property(e => e.MaxLength)
                .HasColumnType("int(11)")
                .HasColumnName("maxLength");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.RateMax)
                .HasColumnType("int(11)")
                .HasColumnName("rateMax");
            entity.Property(e => e.Title)
                .HasColumnType("text")
                .HasColumnName("title");
            entity.Property(e => e.Type)
                .HasColumnType("int(11)")
                .HasColumnName("type");

            entity.HasOne(d => d.TypeNavigation).WithMany(p => p.Questions)
                .HasForeignKey(d => d.Type)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_questionType");
        });

        modelBuilder.Entity<Questiontype>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("questiontype");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Type)
                .HasMaxLength(255)
                .HasColumnName("type");
        });

        modelBuilder.Entity<Researcher>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("researchers", tb => tb.HasComment("table for researchers"));

            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.ResearcherId)
                .HasMaxLength(255)
                .HasColumnName("researcherId");
        });

        modelBuilder.Entity<Survey>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("survey");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.DateCreated)
                .HasColumnType("datetime")
                .HasColumnName("date_created");
            entity.Property(e => e.LogoPosition)
                .HasColumnType("text")
                .HasColumnName("logoposition");
            entity.Property(e => e.Title)
                .HasColumnType("text")
                .HasColumnName("name");
            entity.Property(e => e.Researcher)
                .HasColumnType("text")
                .HasColumnName("researcher");
            entity.Property(e => e.Description)
               .HasColumnType("text")
               .HasColumnName("description");
            entity.Property(e => e.Logo)
               .HasColumnType("text")
               .HasColumnName("logo");
            entity.Property(e => e.Pages)
                .HasColumnName("survey")
                .UseCollation("utf8mb4_bin");
        });

        modelBuilder.Entity<SurveyQuestion>(entity =>
        {
            entity.HasKey(e => e.MapId).HasName("PRIMARY");

            entity.ToTable("survey_questions");

            entity.HasIndex(e => e.QuestionId, "FK_question");

            entity.HasIndex(e => e.SurveyId, "FK_survey");

            entity.Property(e => e.MapId)
                .HasColumnType("int(11)")
                .HasColumnName("mapId");
            entity.Property(e => e.QuestionId)
                .HasColumnType("int(11)")
                .HasColumnName("questionId");
            entity.Property(e => e.SurveyId)
                .HasColumnType("int(11)")
                .HasColumnName("surveyId");
            modelBuilder.Entity<SurveyResponse>(entity =>
            {
                entity.HasKey(e => e.Int).HasName("PRIMARY");

                entity.ToTable("survey_response");

                entity.Property(e => e.Int)
                    .HasColumnType("int(11)")
                    .HasColumnName("int");
                entity.Property(e => e.Response).HasColumnName("response");
                entity.Property(e => e.SurveyId)
                    .HasColumnType("int(11)")
                    .HasColumnName("surveyId");
            });

        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
