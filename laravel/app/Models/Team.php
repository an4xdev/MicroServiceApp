<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Team
 * 
 * @property uuid $Id
 * @property string $Name
 * @property uuid $ManagerId
 * 
 * @property User $user
 * @property Collection|User[] $users
 * @property Collection|Sprint[] $sprints
 *
 * @package App\Models
 */
class Team extends Model
{
	protected $table = 'Team';
	protected $primaryKey = 'Id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'Id' => 'uuid',
		'ManagerId' => 'uuid'
	];

	protected $fillable = [
		'Name',
		'ManagerId'
	];

	public function user()
	{
		return $this->belongsTo(User::class, 'ManagerId');
	}

	public function users()
	{
		return $this->hasMany(User::class, 'TeamId');
	}

	public function sprints()
	{
		return $this->hasMany(Sprint::class, 'TeamId');
	}
}
