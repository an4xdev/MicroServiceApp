<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Task
 * 
 * @property uuid $Id
 * @property string $Name
 * @property string|null $Description
 * @property int $TaskTypeId
 * @property int $TaskStatusId
 * @property uuid $DeveloperId
 * @property uuid|null $SprintId
 * 
 * @property TaskType $task_type
 * @property TaskStatus $task_status
 * @property User $user
 * @property Sprint|null $sprint
 * @property Collection|TaskHistory[] $task_histories
 *
 * @package App\Models
 */
class Task extends Model
{
	protected $table = 'Tasks';
	protected $primaryKey = 'Id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'Id' => 'uuid',
		'TaskTypeId' => 'int',
		'TaskStatusId' => 'int',
		'DeveloperId' => 'uuid',
		'SprintId' => 'uuid'
	];

	protected $fillable = [
		'Name',
		'Description',
		'TaskTypeId',
		'TaskStatusId',
		'DeveloperId',
		'SprintId'
	];

	public function task_type()
	{
		return $this->belongsTo(TaskType::class, 'TaskTypeId');
	}

	public function task_status()
	{
		return $this->belongsTo(TaskStatus::class, 'TaskStatusId');
	}

	public function user()
	{
		return $this->belongsTo(User::class, 'DeveloperId');
	}

	public function sprint()
	{
		return $this->belongsTo(Sprint::class, 'SprintId');
	}

	public function task_histories()
	{
		return $this->hasMany(TaskHistory::class, 'TaskId');
	}
}
