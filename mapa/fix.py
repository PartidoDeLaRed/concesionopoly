from sys import stdout
f = open("ConcesionesDB.json.err")

def rreplace(s, old, new, occurrence):
	li = s.rsplit(old, occurrence)
	return new.join(li)

for line in f.readlines():
	if '"x":-' in line or '"y":-' in line:
		if line.count(".") == 2:
			stdout.write(rreplace(line, ".", "",1))
		else:
			stdout.write(line)
	else:
		stdout.write(line)