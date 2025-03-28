<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TaskHistory
 * 
 * @property uuid $Id
 * @property uuid $TaskId
 * @property Carbon $ChangeDate
 * @property int $OldStatusId
 * @property int $NewStatusId
 * 
 * @property Task $task
 * @property TaskStatus $task_status
 *
 * @package App\Models
 */
class TaskHistory extends Model
{
	protected $table = 'TaskHistories';
	protected $primaryKey = 'Id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'Id' => 'uuid',
		'TaskId' => 'uuid',
		'ChangeDate' => 'datetime',
		'OldStatusId' => 'int',
		'NewStatusId' => 'int'
	];

	protected $fillable = [
		'TaskId',
		'ChangeDate',
		'OldStatusId',
		'NewStatusId'
	];

	public function task()
	{
		return $this->belongsTo(Task::class, 'TaskId');
	}

	public function task_status()
	{
		return $this->belongsTo(TaskStatus::class, 'NewStatusId');
	}
}
