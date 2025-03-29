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
 * @property string $NewStatus
 * @property string|null $OldStatus
 * 
 * @property Task $task
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
		'ChangeDate' => 'datetime'
	];

	protected $fillable = [
		'TaskId',
		'ChangeDate',
		'NewStatus',
		'OldStatus'
	];

	public function task()
	{
		return $this->belongsTo(Task::class, 'TaskId');
	}
}
