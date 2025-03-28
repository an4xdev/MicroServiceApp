<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Project
 * 
 * @property uuid $Id
 * @property string $Name
 * @property Carbon $StartDate
 * @property Carbon $EndDate
 * @property int $CompanyId
 * 
 * @property Company $company
 * @property Collection|Sprint[] $sprints
 *
 * @package App\Models
 */
class Project extends Model
{
	protected $table = 'Projects';
	protected $primaryKey = 'Id';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'Id' => 'uuid',
		'StartDate' => 'datetime',
		'EndDate' => 'datetime',
		'CompanyId' => 'int'
	];

	protected $fillable = [
		'Name',
		'StartDate',
		'EndDate',
		'CompanyId'
	];

	public function company()
	{
		return $this->belongsTo(Company::class, 'CompanyId');
	}

	public function sprints()
	{
		return $this->hasMany(Sprint::class, 'ProjectId');
	}
}
