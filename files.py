import os  
import json 


path = "C:/Users/rasah/b2b-platform-ui/platform-ui/projects"

def list_files_recursive(directory):
    file_list = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_list.append(os.path.join(root, file))
    return file_list


files_list = list_files_recursive(path); 
print(len(files_list))

keywords = ['component.', 'helper.', 'service.']; 
ts_files = []
for file in files_list: 
	for keyword in keywords:
		if '.ts' in file and keyword in file : 
			ts_files.append(file) 
			break 

print(len(ts_files)) 

filtered_list = [] 

spec_files = []
non_spec_files = []

for file in ts_files: 
	if 'spec.' in file : spec_files.append(file.split('.spec.ts')[0]) 
	else : non_spec_files.append(file.split('.ts')[0]) 


print(len(spec_files), len(non_spec_files))

diff = list(set(non_spec_files) - set(spec_files)) 

root = 'C:/Users/rasah/b2b-platform-ui/platform-ui/projects'

with open('output.txt', 'w') as output_file : 
	for file in diff : 
		output_file.write(str(file.split(root)[1] + '\n\n'))










