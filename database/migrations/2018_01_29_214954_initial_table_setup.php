<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InitialTableSetup extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parent_nodes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('min');
            $table->integer('max');
            $table->timestamps();
        });

        Schema::create('child_nodes', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('parent_id');
            $table->integer('num');
            $table->timestamps();

            $table->foreign('parent_id')->references('id')->on('parent_nodes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('child_nodes');
        Schema::drop('parent_nodes');
    }
}
