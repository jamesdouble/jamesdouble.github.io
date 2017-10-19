///getGitHubState
function getGitHubState(){
	var jamesdouble = new Gh3.User("jamesdouble")
	/////
    var MyRepositories = new Gh3.Repositories(jamesdouble);
    var TotalCommitsCount = 0;  
    var TotalStarCounts = 0;
    var TotalForkCounts = 0;
    var TotalRepoCount = 0;
    
    MyRepositories.fetch({page:1, per_page:20, direction : "desc"},"next", function (err, res) {
      if(err) {
        throw "outch ..."
      }
      var allrepo =  MyRepositories.getRepositories()
      $.each(allrepo, function(indexs, repo) {
        let reponame = repo.name;
        let repocommitlink =  'https://api.github.com/repos/jamesdouble/' + reponame + '/commits'
        $.getJSON(repocommitlink, function(datas) {
              var thisrepoCommitsCount = datas.length;
              TotalCommitsCount += thisrepoCommitsCount;
              console.log(TotalCommitsCount);
          });
  
      	var isFork = repo.fork
      	if(!isFork){
      		TotalRepoCount += 1;
      	 	/* iterate through array or object */
      	 	repo.fetch(function(){
      	 		TotalStarCounts += repo.stargazers_count;
      	 		TotalForkCounts += repo.forks_count;
      	 		if((indexs == (allrepo.length - 1)) ){
     				   refreshCounter(TotalRepoCount,TotalForkCounts,TotalStarCounts,TotalCommitsCount);
    	 		  }

		    	})
      	}
      });
    });
}


function retrieveCommitsCount(file_dir){
	var typename = file_dir.type;
	/*		Get  File Commit Count		*/
	if(typename == 'file'){
		var file = file_dir
		file.fetchCommits(function(){
			let commitscount = file.getCommits().length;
			return commitscount
		})
	}
	/*		Get Each Dir Commit Count		*/
	else if(typename == 'dir'){
		var Dir = file_dir
		var thisLevelCommitsCount = 0;
		Dir.fetchContents(function(){
			var files = Dir.getContents();
			/*		Get Each File Commit Count		*/
			$.each(files, function(fileindex, subfile_dir) {
				var counts = retrieveCommitsCount(subfile_dir);
				if(counts > thisLevelCommitsCount){
					thisLevelCommitsCount = counts;
				}
				/*		Last File		*/
				if(fileindex == (files.length - 1)){
					return thisLevelCommitsCount
				}
			});
		})
	}
}

function refreshCounter(repocount,forkcount,starcount,commitcount){
	let valarray = [repocount,forkcount,starcount,commitcount,150,500];
	var countindex = 0
	var statSection = $("#stats"),
       		stats = $(".stat-count");
       		///
       		///	WayPoint : Waypoints is the easiest way to trigger a function when you scroll to an element.
       		///
   			statSection.waypoint({
   				handler:  function(direction) 
   				{
   					console.log('Start scroll');
      				if (direction === "down") {       		
			  	 		stats.each(function () {
					    	var $this = $(this);
							$({ Counter: 0 }).animate({ Counter: valarray[countindex++] }, {
				 	  			duration: 4000,
				 	  			easing: 'swing',
				 	  			step: function (curValue) {
				 	    		$this.text(Math.ceil(curValue));
				  	  			}
				  			});
						});
					} 
       			// trigger once only
       			this.destroy();      	
				},
			offset: "90%"
			});	
}



    /*
    //get one repository
    var k33gBlog = new Gh3.Repository("JDBreaksLoading", k33g);

    k33gBlog.fetch(function (err, res) {
      if(err) {
        console.log("Error", err.message, res.status)
        throw err
      }

      console.log("Repository : ", k33gBlog);
      repoTitle.html(k33gBlog.full_name);

      k33gBlog.fetchBranches(function (err, res) {
        if(err) {
          console.log("Error", err.message, res.status)
          throw err
        }

        console.log("Array of branches : ", k33gBlog.getBranches());
        k33gBlog.eachBranch(function (branch) {
          console.log(branch.name);
        })

        //and :
        var master = k33gBlog.getBranchByName("master");
        branchTitle.html(master.name + " (" + master.sha + ") properties :");

        _.each(_.keys(master), function (prop) {
          branchProperties.append(
            $('<li>').append(prop+" : "+master[prop])
          );
        });

      })

    });
	*/