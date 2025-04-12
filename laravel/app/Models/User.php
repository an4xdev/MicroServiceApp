<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class User
 * 
 * @property uuid $Id
 * @property string $Username
 * @property string $PasswordHash
 * @property string $Role
 * @property string|null $RefreshToken
 * @property Carbon|null $RefreshTokenExpiryTime
 * @property string|null $Avatar
 * @property string $PasswordSalt
 * @property uuid|null $TeamId
 * 
 * @property Team|null $team
 * @property Collection|Team[] $teams
 * @property Collection|Sprint[] $sprints
 * @property Collection|Task[] $tasks
 *
 * @package App\Models
 */
class User extends Model
{
	protected $table = 'Users';
	protected $primaryKey = 'Id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'Id' => 'uuid',
		'RefreshTokenExpiryTime' => 'datetime',
		'TeamId' => 'uuid'
	];

	protected $fillable = [
		'Username',
		'PasswordHash',
		'Role',
		'RefreshToken',
		'RefreshTokenExpiryTime',
		'Avatar',
		'PasswordSalt',
		'TeamId'
	];

	public function team()
	{
		return $this->belongsTo(Team::class, 'TeamId');
	}

	public function teams()
	{
		return $this->hasMany(Team::class, 'ManagerId');
	}

	public function sprints()
	{
		return $this->hasMany(Sprint::class, 'ManagerId');
	}

	public function tasks()
	{
		return $this->hasMany(Task::class, 'DeveloperId');
	}
}
