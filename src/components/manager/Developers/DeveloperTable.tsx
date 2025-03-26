import { Developer } from '../../../types/Manager/Developer';
import { Button } from '../../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Loader2 } from 'lucide-react';

interface DevelopersTableProps {
  developers: Developer[];
  isLoading: boolean;
  error: Error | null;
  isDeleting: boolean;
  isToggling: boolean;
  onAddDeveloper: () => void;
  onEditDeveloper: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onDeleteDeveloper: (id: string) => void;
}

export const DevelopersTable = ({
  developers,
  isLoading,
  error,
  isDeleting,
  isToggling,
  onAddDeveloper,
  onEditDeveloper,
  onToggleStatus,
  onDeleteDeveloper
}: DevelopersTableProps) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent className="p-4 text-center text-destructive">
          Error: {error.message}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Developers</CardTitle>
        <Button onClick={onAddDeveloper}>Add Developer</Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NO</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {developers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No developers found
                </TableCell>
              </TableRow>
            ) : (
              developers.map((developer, index) => (
                <TableRow key={developer._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{developer.name}</TableCell>
                  <TableCell>{developer.email}</TableCell>
                  <TableCell>{developer.phoneNumber}</TableCell>
                  <TableCell>
                    <Badge variant={developer.status === 'active' ? 'default' : 'secondary'}>
                      {developer.status || 'active'}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => onEditDeveloper(developer._id)}
                      className="px-3 py-1 bg-blue-600"
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => onToggleStatus(developer._id)}
                      disabled={isToggling}
                      className="px-3 py-1 bg-orange-700"
                    >
                      Block
                    </Button>
                    <Button 
                      variant="destructive"
                      size="sm"
                      onClick={() => onDeleteDeveloper(developer._id)}
                      disabled={isDeleting}
                      className="px-3 py-1"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};