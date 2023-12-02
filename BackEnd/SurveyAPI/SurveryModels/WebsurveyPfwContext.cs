using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SurveyAPI.SurveryModels;

public partial class WebsurveyPfwContext : DbContext
{
    public WebsurveyPfwContext()
    {
    }

    public WebsurveyPfwContext(DbContextOptions<WebsurveyPfwContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<Questiontype> Questiontypes { get; set; }

    public virtual DbSet<Researcher> Researchers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_general_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("question");

            entity.HasIndex(e => e.Type, "FK_questionType").IsUnique();

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.DateCreated).HasColumnName("date_created");
            entity.Property(e => e.DateModified).HasColumnName("date_modified");
            entity.Property(e => e.Text)
                .HasColumnType("text")
                .HasColumnName("text");
            entity.Property(e => e.Type)
                .HasColumnType("int(11)")
                .HasColumnName("type");

        });

        modelBuilder.Entity<Questiontype>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("questiontype");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
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

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
