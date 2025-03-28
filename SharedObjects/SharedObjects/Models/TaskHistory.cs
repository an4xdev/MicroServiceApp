using System.ComponentModel.DataAnnotations;

namespace SharedObjects.Models;

public class TaskHistory
{
    [Key] public Guid Id { get; set; }

    public Guid TaskId { get; set; }
    public Task Task { get; set; } = null!;

    public DateTime ChangeDate { get; set; }

    public int OldStatusId { get; set; }
    public TaskStatus OldStatus { get; set; } = null!;

    public int NewStatusId { get; set; }
    public TaskStatus NewStatus { get; set; } = null!;
}