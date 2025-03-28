<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Sprint
 * 
 * @property uuid $Id
 * @property string $Name
 * @property Carbon $StartDate
 * @property Carbon $EndDate
 * @property uuid $ManagerId
 * @property uuid $ProjectId
 * 
 * @property User $user
 * @property Project $project
 * @property Collection|Task[] $tasks
 *
 * @package App\Models
 */
class Sprint extends Model
{
	protected $table = 'Sprints';
	protected $primaryKey = 'Id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'Id' => 'uuid',
		'StartDate' => 'datetime',
		'EndDate' => 'datetime',
		'ManagerId' => 'uuid',
		'ProjectId' => 'uuid'
	];

	protected $fillable = [
		'Name',
		'StartDate',
		'EndDate',
		'ManagerId',
		'ProjectId'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'ManagerId');
	}

	public function project()
	{
		return $this->belongsTo(Project::class, 'ProjectId');
	}

	public function tasks()
	{
		return $this->hasMany(Task::class, 'SprintId');
	}
}
